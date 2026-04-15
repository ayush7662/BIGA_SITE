const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  return res.status(200).json(cart || { user: req.user._id, items: [] });
};

const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

  const item = cart.items.find((entry) => entry.product.toString() === productId);
  if (item) item.quantity += Number(quantity);
  else cart.items.push({ product: productId, quantity: Number(quantity) });

  await cart.save();
  return res.status(200).json({ message: "Added to cart", cart });
};

const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((entry) => entry.product.toString() === productId);
  if (!item) return res.status(404).json({ message: "Item not found in cart" });

  item.quantity = Number(quantity);
  if (item.quantity <= 0) {
    cart.items = cart.items.filter((entry) => entry.product.toString() !== productId);
  }
  await cart.save();
  return res.status(200).json({ message: "Cart updated", cart });
};

module.exports = { getCart, addToCart, updateCartItem };
