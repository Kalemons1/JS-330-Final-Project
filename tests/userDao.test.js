const mongoose = require('mongoose');
const Post = require('../models/posts');
const PostDao = require('../Dao/postsDao');

// Establish a connection to a test database
beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1/High-Low-Social', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Disconnect from the test database after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
});

describe('PostDao', () => {
  beforeEach(async () => {
    // Clear the database before each test to ensure a clean state
    await Post.deleteMany({});
  });

  describe('createPost', () => {
    test('creates a new post', async () => {
      const postData = {
        content: 'Test post content',
        dailyHigh: 'Best moment of the day',
        dailyLow: 'Worst moment of the day',
        author: mongoose.Types.ObjectId(),
      };

      const createdPost = await PostDao.createPost(postData);
      expect(createdPost.content).toBe(postData.content);
      expect(createdPost.dailyHigh).toBe(postData.dailyHigh);
      expect(createdPost.dailyLow).toBe(postData.dailyLow);
      expect(createdPost.author).toEqual(postData.author);
    });
  });

  describe('getPostById', () => {
    test('retrieves a post by ID', async () => {
      const postData = {
        content: 'Test post content',
        dailyHigh: 'Best moment of the day',
        dailyLow: 'Worst moment of the day',
        author: mongoose.Types.ObjectId(),
      };

      const createdPost = await PostDao.createPost(postData);

      const retrievedPost = await PostDao.getPostById(createdPost._id);
      expect(retrievedPost.content).toBe(postData.content);
      expect(retrievedPost.dailyHigh).toBe(postData.dailyHigh);
      expect(retrievedPost.dailyLow).toBe(postData.dailyLow);
      expect(retrievedPost.author).toEqual(postData.author);
    });
  });

  describe('updatePost', () => {
    test('updates a post', async () => {
      const postData = {
        content: 'Test post content',
        dailyHigh: 'Best moment of the day',
        dailyLow: 'Worst moment of the day',
        author: mongoose.Types.ObjectId(),
      };

      const createdPost = await PostDao.createPost(postData);

      const updatedData = {
        content: 'Updated post content',
        dailyHigh: 'Updated best moment',
        dailyLow: 'Updated worst moment',
      };

      const updatedPost = await PostDao.updatePost(createdPost._id, updatedData);
      expect(updatedPost.content).toBe(updatedData.content);
      expect(updatedPost.dailyHigh).toBe(updatedData.dailyHigh);
      expect(updatedPost.dailyLow).toBe(updatedData.dailyLow);
    });
  });

  describe('deletePost', () => {
    test('deletes a post', async () => {
      const postData = {
        content: 'Test post content',
        dailyHigh: 'Best moment of the day',
        dailyLow: 'Worst moment of the day',
        author: mongoose.Types.ObjectId(),
      };

      const createdPost = await PostDao.createPost(postData);

      await PostDao.deletePost(createdPost._id);

      const retrievedPost = await PostDao.getPostById(createdPost._id);
      expect(retrievedPost).toBeNull();
    });
  });

  describe('searchPosts', () => {
    test('searches posts by text', async () => {
      const postData = [
        {
          content: 'Test post content 1',
          dailyHigh: 'Best moment of the day 1',
          dailyLow: 'Worst moment of the day 1',
          author: mongoose.Types.ObjectId(),
        },
        {
          content: 'Test post content 2',
          dailyHigh: 'Best moment of the day 2',
          dailyLow: 'Worst moment of the day 2',
          author: mongoose.Types.ObjectId(),
        },
      ];

      await Post.insertMany(postData);

      const searchText = 'Test post content';
      const searchedPosts = await PostDao.searchPosts(searchText);
      expect(searchedPosts.length).toBe(2);
    });
  });
});
