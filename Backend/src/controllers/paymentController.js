const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

// 💳 Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder", 
  key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
});

/**
 * 🔑 Get Razorpay Key ID
 * Helps the frontend load the correct key from .env securely
 */
exports.getKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};

/**
 * 🚀 Create Razorpay Order
 * Triggered when user clicks 'Place Order' on Checkout
 */
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    const options = {
      amount: amount * 100, // Amount in paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "Failed to create Razorpay order" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Create Order Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * ✅ Verify Payment & Sync POS
 * Triggered after user completes payment in the Razorpay Modal
 */
exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderData // Local order details to save (items, total, etc)
    } = req.body;

    // 1️⃣ Verify Signature
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "placeholder_secret");
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ message: "Transaction not authentic!" });
    }

    // 2️⃣ Save Order to our Database
    const newOrder = new Order({
      ...orderData,
      user: req.user._id, // Assumes authMiddleware provides req.user
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paid: true,
      status: "Confirmed"
    });

    await newOrder.save();

    // 3️⃣ 🔥 POS Integration Hook
    // Here we would push to the POS API
    // await syncToPOS(newOrder); 

    res.status(200).json({ 
      success: true, 
      message: "Payment verified successfully", 
      order: newOrder 
    });
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🤖 Placeholder POS Sync Service
const syncToPOS = async (order) => {
    try {
        console.log(`[POS SYNC] Pushing Order ${order.orderId} to Restaurant POS system...`);
        // Example: await axios.post(process.env.POS_API_URL, order, { headers: { Auth: process.env.POS_KEY }});
    } catch (err) {
        console.error("POS Sync Failed:", err.message);
    }
};
