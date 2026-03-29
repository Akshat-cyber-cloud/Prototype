const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    // Check for token in cookies
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token found" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from the token
        req.user = await User.findById(decoded.id).select("-password");
        
        if (!req.user) {
            return res.status(401).json({ message: "User no longer exists" });
        }

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = { protect };
