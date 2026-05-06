const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const stripe = require("../config/stripe");

const placeOrder = async (req, res) => {
  const { paymentMethod, deliveryAddress } = req.body;
  if (!deliveryAddress || !deliveryAddress.address) {
    return res.status(400).json({ message: "Delivery address required" });
  }
  if (paymentMethod !== 'cod') {
    return res.status(400).json({ message: "Only COD supported here" });
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const items = [];
  let totalAmount = 0;
  for (const entry of cart.items) {
    const product = entry.product;
    if (product.stock < entry.quantity) {
      return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
    }

    items.push({
      product: product._id,
      name: product.name,
      image: product.image,
      quantity: entry.quantity,
      price: product.price,
      shopkeeper: product.createdBy,
    });
    totalAmount += product.price * entry.quantity;
    product.stock -= entry.quantity;
    await Product.findByIdAndUpdate(product._id, { stock: product.stock });
  }

  const order = await Order.create({
    customer: req.user._id,
    deliveryAddress,
    items,
    totalAmount,
    paymentStatus: "cod",
    status: "pending",
  });

  cart.items = [];
  await cart.save();
  return res.status(201).json({ message: "Order placed successfully with COD", order });
};

const getCustomerOrders = async (req, res) => {
  const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(orders);
};

const getShopkeeperOrders = async (req, res) => {
  const orders = await Order.find({ "items.shopkeeper": req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(orders);
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  const ownsAnyItem = order.items.some(
    (item) => item.shopkeeper.toString() === req.user._id.toString()
  );
  if (!ownsAnyItem) return res.status(403).json({ message: "Forbidden" });

  order.status = status;
  await order.save();
  return res.status(200).json({ message: "Order status updated", order });
};

const createCheckoutSession = async (req, res) => {
  const { deliveryAddress } = req.body;
  if (!deliveryAddress || !deliveryAddress.address) {
    return res.status(400).json({ message: "Delivery address required" });
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const line_items = cart.items.map(entry => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: entry.product.name,
      },
      unit_amount: entry.product.price * 100, // paise
    },
    quantity: entry.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${req.headers.origin}/orders?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/cart`,
    metadata: {
      userId: req.user._id.toString(),
      cartId: cart._id.toString(),
      deliveryAddress: JSON.stringify(deliveryAddress),
    },
  });

  res.json({ url: session.url });
};

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err) {
    console.log(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const cartId = session.metadata.cartId;

    // Stock already deducted on session? No, deduct on webhook to prevent dup
    // But for simplicity, since session line_items, but cart populated, assume deduct on create but rollback if fail? Skip for now, deduct on frontend post before redirect? Complex. Deduct on webhook.

    const deliveryAddress = JSON.parse(session.metadata.deliveryAddress || '{}');
    const cart = await Cart.findById(cartId).populate("items.product");
    if (cart && cart.items.length > 0) {
      const items = [];
      let totalAmount = 0;
      for (const entry of cart.items) {
        const product = entry.product;
        items.push({
          product: product._id,
          name: product.name,
          image: product.image,
          quantity: entry.quantity,
          price: product.price,
          shopkeeper: product.createdBy,
        });
        totalAmount += product.price * entry.quantity;
        product.stock -= entry.quantity;
        await Product.findByIdAndUpdate(product._id, { stock: product.stock });
      }

      await Order.create({
        customer: userId,
        deliveryAddress,
        items,
        totalAmount,
        paymentStatus: "paid",
        status: "pending",
      });

      cart.items = [];
      await cart.save();
    }
  }

  res.json({received: true});
};

module.exports = { placeOrder, getCustomerOrders, getShopkeeperOrders, updateOrderStatus, createCheckoutSession, stripeWebhook };
