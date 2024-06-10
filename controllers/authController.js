const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserDao = require('../dao/userDao');

const authController = {};

// User signup
authController.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Include username in destructuring
    if (!username || !email || !password) { // Check if username, email, and password are provided
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    const existingUser = await UserDao.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserDao.createUser({ username, email, password: hashedPassword }); // Pass username to createUser

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in user signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// User login
authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await UserDao.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error in user login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = authController;
