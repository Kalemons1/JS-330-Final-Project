// postRoutes.js
const express = require('express');
const PostController = require('../controllers/postsController');
const CommentController = require('../controllers/commentController');
const { verifyToken } = require('../middleware/auth');
console.log(PostController.createPost)
const router = express.Router();

// Create a new post
router.post('/', verifyToken, PostController.createPost);

// Get all posts
router.get('/', PostController.getAllPosts);

// Get a post by ID
router.get('/:id', PostController.getPostById);

// Update a post
router.put('/:id', verifyToken, PostController.updatePost);

// Delete a post
router.delete('/:id', verifyToken, PostController.deletePost);

router.get('/search', PostController.searchPosts);

router.post('/:id/comments',verifyToken, CommentController.createComment)

module.exports = router;


