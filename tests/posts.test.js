const PostController = require('../controllers/postsController');
const PostDao = require('../Dao/postsDao');
const httpMocks = require('node-mocks-http');

describe('PostController', () => {
  describe('getAllPosts', () => {
    it('should return all posts', async () => {
      const req = {};
      const res = httpMocks.createResponse();
      const posts = [{ title: 'Post 1' }, { title: 'Post 2' }];
      jest.spyOn(PostDao, 'getAllPosts').mockResolvedValueOnce(posts);

      await PostController.getAllPosts(req, res);
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(posts);
    });

    it('should return 500 if there is a server error', async () => {
      const req = {};
      const res = httpMocks.createResponse();
      jest.spyOn(PostDao, 'getAllPosts').mockRejectedValueOnce(new Error('Server error'));

      await PostController.getAllPosts(req, res);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({ error: 'Server error' });
    });
  });

  describe('getPostById', () => {
    it('should return the post with the specified ID', async () => {
      const req = { params: { id: '123' } };
      const res = httpMocks.createResponse();
      const post = { title: 'Test Post' };
      jest.spyOn(PostDao, 'getPostById').mockResolvedValueOnce(post);

      await PostController.getPostById(req, res);
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(post);
    });

    it('should return 404 if the post is not found', async () => {
      const req = { params: { id: '123' } };
      const res = httpMocks.createResponse();
      jest.spyOn(PostDao, 'getPostById').mockResolvedValueOnce(null);

      await PostController.getPostById(req, res);
      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Post not found' });
    });

    it('should return 500 if there is a server error', async () => {
      const req = { params: { id: '123' } };
      const res = httpMocks.createResponse();
      jest.spyOn(PostDao, 'getPostById').mockRejectedValueOnce(new Error('Server error'));

      await PostController.getPostById(req, res);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({ error: 'Server error' });
    });
  });

  describe('updatePost', () => {
    it('should update the post with the specified ID', async () => {
      const req = { params: { id: '123' }, body: { title: 'Updated Post' } };
      const res = httpMocks.createResponse();
      const updatedPost = { _id: '123', title: 'Updated Post' };
      jest.spyOn(PostDao, 'updatePost').mockResolvedValueOnce(updatedPost);

      await PostController.updatePost(req, res);
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(updatedPost);
    });

    it('should return 404 if the post is not found', async () => {
      const req = { params: { id: '123' }, body: { title: 'Updated Post' } };
      const res = httpMocks.createResponse();
      jest.spyOn(PostDao, 'updatePost').mockResolvedValueOnce(null);

      await PostController.updatePost(req, res);
      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Post not found' });
    });

    it('should return 500 if there is a server error', async () => {
      const req = { params: { id: '123' }, body: { title: 'Updated Post' } };
      const res = httpMocks.createResponse();
      jest.spyOn(PostDao, 'updatePost').mockRejectedValueOnce(new Error('Server error'));

      await PostController.updatePost(req, res);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({ error: 'Server error' });
    });
  });

  describe('deletePost', () => {
    it('should delete the post with the specified ID', async () => {
      const req = { params: { id: '123' } };
      const res = httpMocks.createResponse();
      const deletedPost = { _id: '123', title: 'Deleted Post' };
      jest.spyOn(PostDao, 'deletePost').mockResolvedValueOnce(deletedPost);

      await PostController.deletePost(req, res);
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Post deleted successfully' });
    });

    it('should return 404 if the post is not found', async () => {
      const req = { params: { id: '123' } };
      const res = httpMocks.createResponse();
      jest.spyOn(PostDao, 'deletePost').mockResolvedValueOnce(null);

      await PostController.deletePost(req, res);
      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Post not found' });
    });

    it('should return 500 if there is a server error', async () => {
      const req = { params: { id: '123' } };
      const res = httpMocks.createResponse();
      jest.spyOn(PostDao, 'deletePost').mockRejectedValueOnce(new Error('Server error'));

      await PostController.deletePost(req, res);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({ error: 'Server error' });
    });
  });

  // New tests for searchPosts
  describe('searchPosts', () => {
    it('should return posts that match the search query', async () => {
      const req = { query: { q: 'test' } };
      const res = httpMocks.createResponse();
      const posts = [{ title: 'Test Post' }, { title: 'Another Test Post' }];
      jest.spyOn(PostDao, 'searchPosts').mockResolvedValueOnce(posts);

      await PostController.searchPosts(req, res);
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(posts);
    });

    it('should return 500 if there is a server error', async () => {
      const req = { query: { q: 'test' } };
      const res = httpMocks.createResponse();
      jest.spyOn(PostDao, 'searchPosts').mockRejectedValueOnce(new Error('Server error'));

      await PostController.searchPosts(req, res);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Server error' });
    });
  });
});
