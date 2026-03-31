const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { protect } = require("../middlewares/authMiddleware"); // Fixed: Destructure 'protect'

// 🔑 Get Razorpay Key
router.get("/get-key", protect, paymentController.getKey);

// 💳 Create Razorpay Order
router.post("/create-order", protect, paymentController.createOrder);

// ✅ Verify Payment & Handle POS Hook
router.post("/verify", protect, paymentController.verifyPayment);

module.exports = router;
