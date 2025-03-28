const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware

const router = express.Router();

// Protected route: Only authenticated users can access this
router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ msg: `Welcome, user with ID: ${req.user.id}`, role: req.user.role });
});

module.exports = router;
