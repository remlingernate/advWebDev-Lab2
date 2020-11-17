var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var buildBlogList = function(req, res, results) {
    var blogs = [];
    results.forEach(function(obj) {
        blogs.push({
            blogTitle: obj.blogTitle,
            blogText: obj.blogText,
            createdOn: obj.createdOn,
            _id: obj._id,
            authorName: obj.authorName,
            authorEmail: obj.authorEmail
        });
    });
    return blogs;
};

module.exports.blogsList = function(req, res) {
    console.log('Getting blogs list');
    Blog
        .find()
        .sort('-createdOn')
        .exec(function(err, results) {
            if (!results) {
                sendJsonResponse(res, 404, {
                    "message": "no blogs found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, buildBlogList(req, res, results));
        });
};

module.exports.blogsCreate = function(req, res) {
    Blog
        .create({
            blogTitle: req.body.blogTitle,
            blogText: req.body.blogText,
            authorName: req.body.authorName,
            authorEmail: req.body.authorEmail
        }, function(err, blog) {
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                sendJsonResponse(res, 201, blog);
            }
        });
};

module.exports.blogsReadOne = function(req, res) {
    if (req.params && req.params.blogId) {
        Blog
            .findById(req.params.blogId)
            .exec(function(err, blog) {
                if (!blog) {
                    sendJsonResponse(res, 404, {
                        "message": "blogId not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, blog);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No blogId in request"
        });
    }
};

module.exports.blogsUpdateOne = function(req, res) {
    if (!req.params.blogId) {
        sendJsonResponse(res, 404, {
            "message": "Not found, blogId is required"
        });
        return;
    }
    Blog
        .findById(req.params.blogId)
        .exec(
            function(err, blog) {
                if (!blog) {
                    sendJsonResponse(res, 404, {
                        "message": "blogId not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                blog.blogTitle = req.body.blogTitle;
                blog.blogText = req.body.blogText;
                blog.createdOn = Date.now();
                blog.save(function(err, blog) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, blog);
                    }
                });
            }
        );
};

module.exports.blogsDeleteOne = function(req, res) {
    var blogId = req.params.blogId;
    if (blogId) {
        Blog
            .findByIdAndRemove(blogId)
            .exec(
                function(err, blog) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No blogId"
        });
    }
};