const express = require("express");
const { getWishlist, toggleWishlistItem } = require("../controllers/wishlistController");
const { authorize, protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, authorize("customer"), getWishlist);
router.post("/toggle", protect, authorize("customer"), toggleWishlistItem);

module.exports = router;
