const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const passport = require("passport");
require("./config/passport");
const app = express();  

// Refined CORS for cloud environments
const allowedOrigins = [
    "http://localhost:5173",
    "https://prototype-ebca.onrender.com",
    "https://prototype-sandy-rho.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        // 1️⃣ Allow requests with no origin (like mobile apps/curl)
        if (!origin) return callback(null, true);

        // 2️⃣ Check if origin is in whitelist or is a Vercel/Render subdomain
        const isAllowed = allowedOrigins.includes(origin) || 
                         origin.endsWith(".vercel.app") || 
                         origin.endsWith(".onrender.com");

        if (isAllowed) {
            callback(null, true);
        } else {
            console.warn(`[CORS REJECTED] Origin: ${origin}`);
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Base Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);


module.exports = app;