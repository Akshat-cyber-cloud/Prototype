const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

// Both order routes are protected by the auth middleware
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

module.exports = router;
