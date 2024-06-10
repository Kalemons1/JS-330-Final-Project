const Comment = require('../models/comment');  // Adjust the path to your Comment model

class CommentDao {
  static async createComment(data) {
    const comment = new Comment(data);
    return await comment.save();
  }

  static async getAllComments() {
    return await Comment.find().populate('userId', 'username').populate('postId', 'title');
  }

  static async getCommentsByPostId(postId) {
    return await Comment.find({ postId }).populate('userId', 'username');
  }

  static async getCommentById(commentId) {
    return await Comment.findById(commentId).populate('userId', 'username').populate('postId', 'title');
  }

  static async updateComment(commentId, data) {
    return await Comment.findByIdAndUpdate(commentId, data, { new: true });
  }

  static async deleteComment(commentId) {
    return await Comment.findByIdAndDelete(commentId);
  }
}

module.exports = CommentDao;

