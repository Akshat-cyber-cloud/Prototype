const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT for the user
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for duplicate user
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            const token = generateToken(user._id);
            
            // Set HttpOnly Cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // Set to true in production (HTTPS)
                sameSite: "Lax",
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });

            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                message: "User registered successfully",
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);

            // Set HttpOnly Cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, 
                sameSite: "Lax",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Logout user / Clear cookie
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
};


