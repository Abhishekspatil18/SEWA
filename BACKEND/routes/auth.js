const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    const { fullName, email, password, userType } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ fullName, email, password: hashedPassword, userType });

        await user.save();
        res.json({ msg: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, userType: user.userType });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
