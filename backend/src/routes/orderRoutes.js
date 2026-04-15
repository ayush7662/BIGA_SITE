const express = require("express");
const {
  getCustomerOrders,
  getShopkeeperOrders,
  placeOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const { authorize, protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("customer"), placeOrder);
router.get("/customer", protect, authorize("customer"), getCustomerOrders);
router.get("/shopkeeper", protect, authorize("shopkeeper"), getShopkeeperOrders);
router.put("/:id/status", protect, authorize("shopkeeper"), updateOrderStatus);

module.exports = router;
