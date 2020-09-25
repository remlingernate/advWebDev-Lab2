var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');
var blogController = require('../controllers/blog');

/* GET home page. */
router.get('/', homeController.index);

/* GET blog list page. */
router.get('/blog/list', blogController.blogList);

/* GET blog add page. */
router.get('/blog/add', blogController.blogAdd);

/* POST blog add page. */
router.post('/blog/add', blogController.blogAddPost);

/* GET blog edit page. */
router.get('/blog/edit/:blogId', blogController.blogEdit);

/* POST blog edit page. */
router.post('/blog/edit/:blogId', blogController.blogEditPost);

/* GET blog delete page. */
router.get('/blog/delete/:blogId', blogController.blogDelete);

/* POST blog delete page. */
router.post('/blog/delete/:blogId', blogController.blogDeletePost);

module.exports = router;
