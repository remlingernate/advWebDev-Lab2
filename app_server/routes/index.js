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

/* GET blog edit page. */
router.get('/blog/edit', blogController.blogEdit);

/* GET blog delete page. */
router.get('/blog/delete', blogController.blogDelete);

module.exports = router;
