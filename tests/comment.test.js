const CommentDao = require('../dao/commentDao');
const CommentController = require('../controllers/commentController');
const httpMocks = require('node-mocks-http');


describe('CommentController', () => {
  describe('createComment', () => {
    it('should return 400 if post or content are missing', async () => {
      const req = httpMocks.createRequest({ body: {} });
      const res = httpMocks.createResponse();
      await CommentController.createComment(req, res);
      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Content and post required' });
    });

    it('should return 400 if user is not authenticated', async () => {
      const req = httpMocks.createRequest({ body: { content: 'Test content' }, user: null });
      const res = httpMocks.createResponse();
      await CommentController.createComment(req, res);
      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Content and post required' });
    });

    it('should return 201 if comment is successfully created', async () => {
      const req = httpMocks.createRequest({ body: { content: 'Test content' }, user: { id: 'userId' }, params: { id: 'postId' } });
      const res = httpMocks.createResponse();
      const createdComment = { _id: 'commentId', content: 'Test content', author: 'userId', post: 'postId' };
      jest.spyOn(CommentDao, 'createComment').mockResolvedValueOnce(createdComment);

      await CommentController.createComment(req, res);
      expect(res.statusCode).toBe(201);
      expect(JSON.parse(res._getData())).toEqual(createdComment);
    });

    it('should return 500 if there is a server error', async () => {
      const req = httpMocks.createRequest({ body: { content: 'Test content' }, user: { id: 'userId' }, params: { id: 'postId' } });
      const res = httpMocks.createResponse();
      jest.spyOn(CommentDao, 'createComment').mockRejectedValueOnce(new Error('Server error'));

      await CommentController.createComment(req, res);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Server error' });
    });
  });

  describe('updateComment', () => {
    it('should update the comment with the specified ID', async () => {
      const req = httpMocks.createRequest({ params: { commentId: '123' }, body: { content: 'Updated comment' } });
      const res = httpMocks.createResponse();
      const updatedComment = { _id: '123', content: 'Updated comment' };
      jest.spyOn(CommentDao, 'updateComment').mockResolvedValueOnce(updatedComment);

      await CommentController.updateComment(req, res);
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(updatedComment);
    });

    it('should return 404 if the comment is not found', async () => {
      const req = httpMocks.createRequest({ params: { commentId: '123' }, body: { content: 'Updated comment' } });
      const res = httpMocks.createResponse();
      jest.spyOn(CommentDao, 'updateComment').mockResolvedValueOnce(null);

      await CommentController.updateComment(req, res);
      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Comment not found' });
    });

    it('should return 500 if there is a server error', async () => {
      const req = httpMocks.createRequest({ params: { commentId: '123' }, body: { content: 'Updated comment' } });
      const res = httpMocks.createResponse();
      jest.spyOn(CommentDao, 'updateComment').mockRejectedValueOnce(new Error('Server error'));

      await CommentController.updateComment(req, res);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Server error' });
    });
  });

  describe('deleteComment', () => {
    it('should delete the comment with the specified ID', async () => {
      const req = httpMocks.createRequest({ params: { commentId: '123' } });
      const res = httpMocks.createResponse();
      const deletedComment = { _id: '123', content: 'Deleted comment' };
      jest.spyOn(CommentDao, 'deleteComment').mockResolvedValueOnce(deletedComment);

      await CommentController.deleteComment(req, res);
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Comment deleted' });
    });

    it('should return 404 if the comment is not found', async () => {
      const req = httpMocks.createRequest({ params: { commentId: '123' } });
      const res = httpMocks.createResponse();
      jest.spyOn(CommentDao, 'deleteComment').mockResolvedValueOnce(null);

      await CommentController.deleteComment(req, res);
      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Comment not found' });
    });

    it('should return 500 if there is a server error', async () => {
      const req = httpMocks.createRequest({ params: { commentId: '123' } });
      const res = httpMocks.createResponse();
      jest.spyOn(CommentDao, 'deleteComment').mockRejectedValueOnce(new Error('Server error'));

      await CommentController.deleteComment(req, res);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Server error' });
    });
  });
});
