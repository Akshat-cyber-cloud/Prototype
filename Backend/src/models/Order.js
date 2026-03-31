const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, default: 1 },
            image: { type: String }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["Confirmed", "Cooking", "On the way", "Delivered", "Cancelled"],
        default: "Confirmed"
    },
    paymentMethod: {
        type: String,
        default: "Razorpay"
    },
    razorpayOrderId: {
        type: String
    },
    razorpayPaymentId: {
        type: String
    },
    razorpaySignature: {
        type: String
    },
    paid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
