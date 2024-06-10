const CommentDao = require('../dao/commentDao');

const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id: post } = req.params;

    if (!post || !content) {
      console.error('Post or content missing:', { post, content });
      return res.status(400).json({ message: 'Content and post required' });
    }

    if (!req.user || !req.user.id) {
      console.error('User not authenticated');
      return res.status(401).json({ message: 'User authentication required' });
    }

    const comment = await CommentDao.createComment({
      post,
      content,
      author: req.user.id
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCommentsByPostId = async (req, res) => {
  try {
    const comments = await CommentDao.getCommentsByPostId(req.params.id);
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error getting comments by post ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await CommentDao.updateComment(req.params.commentId, req.body);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await CommentDao.deleteComment(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment
};
