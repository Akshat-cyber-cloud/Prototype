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
        enum: ["Paid", "Preparing", "Delivered", "Cancelled"],
        default: "Paid"
    },
    paymentMethod: {
        type: String,
        default: "Razorpay"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
