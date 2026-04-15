const Wishlist = require("../models/Wishlist");

const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products");
  return res.status(200).json(wishlist || { user: req.user._id, products: [] });
};

const toggleWishlistItem = async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });

  const exists = wishlist.products.some((id) => id.toString() === productId);
  if (exists) {
    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
  } else {
    wishlist.products.push(productId);
  }
  await wishlist.save();
  return res.status(200).json({ message: "Wishlist updated", wishlist });
};

module.exports = { getWishlist, toggleWishlistItem };
