// userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// Signup
router.post("/signup", authController.signup);

// Login
//router.post("/login", authController.login);

// Password
//router.put("/password", authController.changePassword);

module.exports = router;
