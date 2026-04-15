const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "big-a-products" },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });

const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, minRating, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };
    if (minRating) query.ratingAverage = { $gte: Number(minRating) };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query).populate("createdBy", "name role");
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("reviews.user", "name");
  if (!product) return res.status(404).json({ message: "Product not found" });
  return res.status(200).json(product);
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    let image = "";
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      image = uploadResult.secure_url;
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image,
      createdBy: req.user._id,
    });
    return res.status(201).json({ message: "Product created", product });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  if (product.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const updates = req.body;
  if (req.file) {
    const uploadResult = await uploadToCloudinary(req.file.buffer);
    updates.image = uploadResult.secure_url;
  }

  const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
  return res.status(200).json({ message: "Product updated", product: updated });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  if (product.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }
  await product.deleteOne();
  return res.status(200).json({ message: "Product deleted" });
};

const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const existingReview = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (existingReview) {
    existingReview.rating = Number(rating);
    existingReview.comment = comment;
  } else {
    product.reviews.push({ user: req.user._id, rating: Number(rating), comment });
  }

  product.ratingAverage =
    product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;
  await product.save();
  return res.status(200).json({ message: "Review saved", product });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
};
