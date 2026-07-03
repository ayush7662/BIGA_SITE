const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");

const connectDB = require("./config/db");
require("./config/cloudinary");


dotenv.config();

// DB Connection
connectDB();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const app = express();

// CORS (safe for initial deploy)
app.use(
  cors({
    origin:"https://backend-f4cv.onrender.com/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (_req, res) => {
  res.send("BIG A Marketplace API running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("[SERVER ERROR]", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
