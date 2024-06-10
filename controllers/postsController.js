const PostDao = require('../Dao/postsDao');

class PostController {
  static async createPost(req, res) {
    try {
      console.log(req.body);
      const { content, dailyHigh, dailyLow } = req.body;
      if (!dailyHigh || !dailyLow || !content) {
        return res.status(400).json({ message: 'Daily high and low moments are required' });
      }
      const newPost = await PostDao.createPost({
        content,
        dailyHigh,
        dailyLow,
        author: req.user.id
      });
      res.status(201).json(newPost);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  static async getAllPosts(req, res) {
    try {
      const posts = await PostDao.getAllPosts();
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async getPostById(req, res) {
    try {
      const post = await PostDao.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updatePost(req, res) {
    try {
      const updatedPost = await PostDao.updatePost(req.params.id, req.body);
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deletePost(req, res) {
    try {
      const deletedPost = await PostDao.deletePost(req.params.id);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async searchPosts(req, res) {
    try {
      const searchText = req.query.q;
      if (!searchText) {
        return res.status(400).json({ message: 'Query text is required' });
      }

      const posts = await PostDao.searchPosts(searchText);
      res.status(200).json(posts);
    } catch (err) {
      console.error('Error searching posts:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = PostController;
