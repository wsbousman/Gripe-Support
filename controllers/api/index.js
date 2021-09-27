const router = require('express').Router();
const userRoutes = require('./user-routes');
const categoryRoutes = require('./category-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const hugRoutes = require('./hug-routes');

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes); 
router.use('/comments', commentRoutes);
router.use('/hugs', hugRoutes);

module.exports = router; 