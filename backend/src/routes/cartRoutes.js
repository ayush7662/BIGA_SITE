const express = require("express");
const { addToCart, getCart, updateCartItem } = require("../controllers/cartController");
const { authorize, protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, authorize("customer"), getCart);
router.post("/", protect, authorize("customer"), addToCart);
router.put("/", protect, authorize("customer"), updateCartItem);

module.exports = router;
