const express = require("express");
const {
  getCustomerOrders,
  getShopkeeperOrders,
  placeOrder,
  updateOrderStatus,
  createCheckoutSession,
  stripeWebhook,
} = require("../controllers/orderController");
const { authorize, protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("customer"), placeOrder);
router.get("/customer", protect, authorize("customer"), getCustomerOrders);
router.get("/shopkeeper", protect, authorize("shopkeeper"), getShopkeeperOrders);
router.post("/checkout", protect, authorize("customer"), createCheckoutSession);
router.post("/webhook", express.raw({type: "application/json"}), stripeWebhook);
router.put("/:id/status", protect, authorize("shopkeeper"), updateOrderStatus);

module.exports = router;
