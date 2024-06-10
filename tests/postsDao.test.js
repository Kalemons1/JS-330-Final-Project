const mongoose = require('mongoose');
const Post = require('../models/posts');
const Comment = require('../models/comment');  // Import the Comment model
const PostDao = require('../Dao/postsDao');
const CommentDao = require('../dao/commentDao'); // Import the CommentDao

jest.mock('../models/posts');
jest.mock('../models/comment'); // Mock the Comment model

describe('PostDao', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    test('creates a new post', async () => {
      const fakePostData = {
        _id: 'fakeId',
        content: 'Test post content',
        dailyHigh: 'Best moment of the day',
        dailyLow: 'Worst moment of the day',
        author: new mongoose.Types.ObjectId(),
      };

      // Mock the behavior of Post.create
      Post.create.mockResolvedValue(fakePostData);

      const createdPost = await PostDao.createPost(fakePostData);

      // Expect the returned value to match the mocked data
      expect(createdPost).toEqual(fakePostData);
    });
  });

  describe('getPostById', () => {
    test('retrieves a post by ID', async () => {
      const fakePost = {
        _id: 'fakeId',
        content: 'Test post content',
        dailyHigh: 'Best moment of the day',
        dailyLow: 'Worst moment of the day',
        author: new mongoose.Types.ObjectId(),
      };

      // Mock the behavior of Post.findById
      Post.findById.mockResolvedValue(fakePost);

      const retrievedPost = await PostDao.getPostById(fakePost._id);

      // Expect the returned value to match the mocked data
      expect(retrievedPost).toEqual(fakePost);
    });
  });

  describe('updatePost', () => {
    test('updates a post', async () => {
      const fakePostId = 'fakeId';
      const fakeUpdatedPost = {
        _id: fakePostId,
        content: 'Updated post content',
        dailyHigh: 'Updated best moment',
        dailyLow: 'Updated worst moment',
        author: new mongoose.Types.ObjectId(),
      };

      // Mock the behavior of Post.findByIdAndUpdate
      Post.findByIdAndUpdate.mockResolvedValue(fakeUpdatedPost);

      const updatedData = {
        content: 'Updated post content',
        dailyHigh: 'Updated best moment',
        dailyLow: 'Updated worst moment',
      };

      const updatedPost = await PostDao.updatePost(fakePostId, updatedData);

      // Expect the returned value to match the mocked data
      expect(updatedPost).toEqual(fakeUpdatedPost);
    });
  });

  describe('deletePost', () => {
    test('deletes a post', async () => {
      const fakePostId = 'fakeId';

      // Mock the behavior of Post.findByIdAndDelete
      Post.findByIdAndDelete.mockResolvedValue({});

      const deletedPost = await PostDao.deletePost(fakePostId);

      // Expect the returned value to be empty object (as the post is deleted)
      expect(deletedPost).toEqual({});
    });
  });

  describe('searchPosts', () => {
    test('searches posts by text', async () => {
      const fakeSearchedPosts = [
        {
          _id: 'fakeId1',
          content: 'Test post content 1',
          dailyHigh: 'Best moment of the day 1',
          dailyLow: 'Worst moment of the day 1',
          author: new mongoose.Types.ObjectId(),
        },
        {
          _id: 'fakeId2',
          content: 'Test post content 2',
          dailyHigh: 'Best moment of the day 2',
          dailyLow: 'Worst moment of the day 2',
          author: new mongoose.Types.ObjectId(),
        },
      ];

      // Mock the behavior of Post.find
      Post.find.mockResolvedValue(fakeSearchedPosts);

      const searchText = 'Test post content';
      const searchedPosts = await PostDao.searchPosts(searchText);

      // Expect the returned value to match the mocked data
      expect(searchedPosts).toEqual(fakeSearchedPosts);
    });
  });
});

describe('CommentDao', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createComment', () => {
    test('creates a new comment', async () => {
      const fakeCommentData = {
        _id: 'fakeCommentId',
        content: 'Test comment content',
        userId: new mongoose.Types.ObjectId(),
        postId: new mongoose.Types.ObjectId(),
      };

      // Mock the behavior of Comment.create
      Comment.create.mockResolvedValue(fakeCommentData);

      const createdComment = await CommentDao.createComment(fakeCommentData);

      // Expect the returned value to match the mocked data
      expect(createdComment).toEqual(fakeCommentData);
    });
  });
  describe('getAllComments', () => {
    // Test case for getting all comments
    test('gets all comments', async () => {
      const fakeComments = [
        {
          _id: 'fakeCommentId1',
          content: 'Test comment content 1',
          userId: new mongoose.Types.ObjectId(),
          postId: new mongoose.Types.ObjectId(),
        },
        {
          _id: 'fakeCommentId2',
          content: 'Test comment content 2',
          userId: new mongoose.Types.ObjectId(),
          postId: new mongoose.Types.ObjectId(),
        },
      ];

      // Mock the behavior of Comment.find
      Comment.find.mockResolvedValue(fakeComments);

      const allComments = await CommentDao.getAllComments();

      // Expect the returned value to match the mocked data
      expect(allComments).toEqual(fakeComments);
    });
  });

  describe('getCommentsByPostId', () => {
    // Test case for getting comments by post ID
    test('gets comments by post ID', async () => {
      const postId = 'fakePostId';
      const fakeComments = [
        {
          _id: 'fakeCommentId1',
          content: 'Test comment content 1',
          userId: new mongoose.Types.ObjectId(),
          postId: postId,
        },
        {
          _id: 'fakeCommentId2',
          content: 'Test comment content 2',
          userId: new mongoose.Types.ObjectId(),
          postId: postId,
        },
      ];

      // Mock the behavior of Comment.find
      Comment.find.mockResolvedValue(fakeComments);

      const commentsByPostId = await CommentDao.getCommentsByPostId(postId);

      // Expect the returned value to match the mocked data
      expect(commentsByPostId).toEqual(fakeComments);
    });
  });

  describe('getCommentById', () => {
    // Test case for getting a comment by ID
    test('gets a comment by ID', async () => {
      const fakeCommentId = 'fakeCommentId';
      const fakeComment = {
        _id: fakeCommentId,
        content: 'Test comment content',
        userId: new mongoose.Types.ObjectId(),
        postId: new mongoose.Types.ObjectId(),
      };

      // Mock the behavior of Comment.findById
      Comment.findById.mockResolvedValue(fakeComment);

      const commentById = await CommentDao.getCommentById(fakeCommentId);

      // Expect the returned value to match the mocked data
      expect(commentById).toEqual(fakeComment);
    });
  });

  describe('updateComment', () => {
    // Test case for updating a comment
    test('updates a comment', async () => {
      const fakeCommentId = 'fakeCommentId';
      const fakeUpdatedComment = {
        _id: fakeCommentId,
        content: 'Updated comment content',
        userId: new mongoose.Types.ObjectId(),
        postId: new mongoose.Types.ObjectId(),
      };

      // Mock the behavior of Comment.findByIdAndUpdate
      Comment.findByIdAndUpdate.mockResolvedValue(fakeUpdatedComment);

      const updatedData = {
        content: 'Updated comment content',
      };

      const updatedComment = await CommentDao.updateComment(fakeCommentId, updatedData);

      // Expect the returned value to match the mocked data
      expect(updatedComment).toEqual(fakeUpdatedComment);
    });
  });

  describe('deleteComment', () => {
    // Test case for deleting a comment
    test('deletes a comment', async () => {
      const fakeCommentId = 'fakeCommentId';

      // Mock the behavior of Comment.findByIdAndDelete
      Comment.findByIdAndDelete.mockResolvedValue({});

      const deletedComment = await CommentDao.deleteComment(fakeCommentId);

      // Expect the returned value to be empty object (as the comment is deleted)
      expect(deletedComment).toEqual({});
    });
  });
});