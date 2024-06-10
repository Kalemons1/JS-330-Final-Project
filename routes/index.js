const express = require('express');
const router = express.Router();
const postsRouter = require('./posts');
const userRouter = require('./user');
const authRouter = require('./auth');

// Mount routers
router.use('/posts', postsRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);

module.exports = router;
