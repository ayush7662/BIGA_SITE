const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
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
    items,
    totalAmount,
    paymentStatus: "paid",
  });

  cart.items = [];
  await cart.save();
  return res.status(201).json({ message: "Order placed successfully", order });
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

module.exports = { placeOrder, getCustomerOrders, getShopkeeperOrders, updateOrderStatus };
