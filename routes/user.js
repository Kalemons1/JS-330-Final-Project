// user.js
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

//signup 
router.post("/signup", authController.signup);

//login
router.post("/login", authController.login);

//password
router.put("/password", authController.changePassword);

module.exports = router;


