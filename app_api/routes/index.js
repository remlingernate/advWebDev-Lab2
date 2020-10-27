var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
var ctrlBlogs = require('../controllers/blogs');
var ctrlAuth = require('../controllers/authentication');

router.get('/blogs', ctrlBlogs.blogsList);
router.post('/blogs', auth, ctrlBlogs.blogsCreate);
router.get('/blogs/:blogId', ctrlBlogs.blogsReadOne);
router.put('/blogs/:blogId', auth, ctrlBlogs.blogsUpdateOne);
router.delete('/blogs/:blogId', auth, ctrlBlogs.blogsDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;