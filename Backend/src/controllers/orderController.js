const Order = require("../models/Order");

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const { items, total, otp, orderId } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No order items found" });
        }

        const order = new Order({
            user: req.user._id,
            items,
            total,
            otp,
            orderId,
            status: "Confirmed",
            paymentMethod: "Razorpay"
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    } catch (error) {
        console.error("Create Order Error:", error.message);
        res.status(500).json({ message: "Server error while creating order", error: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        // Find orders for the user, sort by latest
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Get My Orders Error:", error.message);
        res.status(500).json({ message: "Server error while fetching orders", error: error.message });
    }
};
