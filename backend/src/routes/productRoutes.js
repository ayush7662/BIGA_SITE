const express = require("express");
const {
  addReview,
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} = require("../controllers/productController");
const { authorize, protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, authorize("shopkeeper"), upload.single("image"), createProduct);
router.put("/:id", protect, authorize("shopkeeper"), upload.single("image"), updateProduct);
router.delete("/:id", protect, authorize("shopkeeper"), deleteProduct);
router.post("/:id/reviews", protect, authorize("customer"), addReview);

module.exports = router;
