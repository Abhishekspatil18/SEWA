const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5500;
const SECRET_KEY = "your_secret_key";

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/sewa", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  userType: String, // 'customer' or 'recycler'
});

// User Model
const User = mongoose.model("User", UserSchema);

// ✅ REGISTER API
app.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, userType } = req.body;

    // Check if user already exists
    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ fullName, email, password: hashedPassword, userType });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ LOGIN API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, userType: user.userType }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token, userType: user.userType });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));