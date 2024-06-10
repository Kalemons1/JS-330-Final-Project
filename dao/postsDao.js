const mongoose = require('mongoose');
const Post = require('../models/posts'); 

class PostDao {
  static async createPost(postData) {
    const post = new Post(postData);
    return await post.save();
  }

  static async getAllPosts() {
    return await Post.find({});
  }

  static async getPostById(postId) {
    return await Post.findById(postId);
  }

  static async updatePost(postId, postData) {
    return await Post.findByIdAndUpdate(postId, postData, { new: true });
  }

  static async deletePost(postId) {
    return await Post.findByIdAndDelete(postId);
  }

  static async searchPosts(searchText) {
    return await Post.find({ $text: { $search: searchText } });
  }
}

module.exports = PostDao;
