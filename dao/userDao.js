const User = require('../models/user');

class UserDao {
  static async createUser(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      return await User.findOne({ email: email });
    } catch (error) {
      throw error;
    }
  }

  static async getUserProfile(userId) {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw error;
    }
  }

  static async updateUserProfile(userId, userData) {
    try {
      return await User.findByIdAndUpdate(userId, userData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserProfile(userId) {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserDao;

