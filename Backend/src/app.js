const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const passport = require("passport");
require("./config/passport");
const app = express();  

// Refined CORS for credentials & cookies
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Base Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);


module.exports = app;