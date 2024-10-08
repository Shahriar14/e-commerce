// routes/authRoute.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt"); // For hashing passwords
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator"); // For input validation
const rateLimit = require("express-rate-limit"); // For rate limiting

// Configure Rate Limiter for Registration and Login Routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { success: false, message: "Too many requests from this IP, please try again after 15 minutes." },
});

// Registration Route
router.post(
    "/register",
    authLimiter,
    [
        // Input validation using express-validator
        body("username")
            .isLength({ min: 3 })
            .withMessage("Username must be at least 3 characters long.")
            .trim()
            .escape(),
        body("email")
            .isEmail()
            .withMessage("Please provide a valid email.")
            .normalizeEmail(),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long.")
            .matches(/\d/)
            .withMessage("Password must contain a number.")
            .matches(/[A-Z]/)
            .withMessage("Password must contain an uppercase letter.")
            .matches(/[a-z]/)
            .withMessage("Password must contain a lowercase letter.")
            .matches(/[@$!%*?&#]/)
            .withMessage("Password must contain a special character."),
    ],
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            // Check if the email or username already exists
            const existingUser = await User.findOne({
                $or: [{ email: req.body.email }, { username: req.body.username }],
            });
            if (existingUser) {
                return res.status(400).json({ success: false, message: "Username or email already exists!" });
            }

            // Hash the password using bcrypt
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword, // Store hashed password
            });

            const savedUser = await newUser.save();

            // Exclude the password from the response
            const { password, ...others } = savedUser._doc;

            res.status(201).json({ success: true, data: others });
        } catch (err) {
            console.error("Registration Error:", err);
            res.status(500).json({ success: false, message: "Server error during registration." });
        }
    }
);

// Login Route
router.post(
    "/login",
    authLimiter,
    [
        // Input validation using express-validator
        body("email")
            .isEmail()
            .withMessage("Please provide a valid email.")
            .normalizeEmail(),
        body("password")
            .exists()
            .withMessage("Password is required."),
    ],
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json({ success: false, message: "Wrong credentials!" });
            }

            // Compare the provided password with the hashed password
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ success: false, message: "Wrong credentials!" });
            }

            // Generate JWT token
            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,
                { expiresIn: "3d" }
            );

            // Exclude the password from the response
            const { password, ...others } = user._doc;

            res.status(200).json({ success: true, data: { ...others, accessToken } });
        } catch (err) {
            console.error("Login Error:", err);
            res.status(500).json({ success: false, message: "Server error during login." });
        }
    }
);

module.exports = router;
