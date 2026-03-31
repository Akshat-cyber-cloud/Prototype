const express = require("express");
const router = express.Router();
const passport = require("passport");
const { 
    register, 
    login, 
    logout, 
    googleCallback, 
    getUserProfile, 
    updateUserProfile 
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

// Auth Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", 
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    googleCallback
);

// Profile Management
router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router;
