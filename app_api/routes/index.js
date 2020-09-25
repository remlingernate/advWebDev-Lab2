var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

router.get('/blogs', ctrlBlogs.blogsList);
router.post('/blogs', ctrlBlogs.blogsCreate);
router.get('/blogs/:blogId', ctrlBlogs.blogsReadOne);
router.put('/blogs/:blogId', ctrlBlogs.blogsUpdateOne);
router.delete('/blogs/:blogId', ctrlBlogs.blogsDeleteOne);

module.exports = router;
