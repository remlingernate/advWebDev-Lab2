var request = require('request');
var apiOptions = {
    server: "http://localhost"
};

var name = 'Nate Remlinger';

var renderListPage = function(req, res, responseBody) {
    console.log(responseBody);
    res.render ('blogList', {
	title: 'Blog List',
	name: name,
	blogs: responseBody
    });
};

module.exports.blogList = function (req, res) {
    var path = '/api/blogs';
    var requestOptions = {
	url: apiOptions.server + path,
	method: "GET",
	json: {},
	qs: {}
    };
    request(requestOptions,
	function(err, response, body) {
	    renderListPage(req, res, body);
	}
    );
};

module.exports.blogAdd = function (req, res) {
    res.render ('blogAdd', { title: 'Blog Add', name: name });
};

module.exports.blogAddPost = function (req, res) {
    var path = '/api/blogs';
    var postData = {
	blogTitle: req.body.blogTitle,
	blogText:  req.body.blogText
    };
    var requestOptions = {
	url: apiOptions.server + path,
	method: "POST",
	json: postData
    };

    request(requestOptions,
	function(err, response, body) {
	    if(response.statusCode === 201) {
		res.redirect('/blog/list');
	    }
	    else {
		console.log('error');
	    }
	}
    );

};

var renderEditPage = function (req, res, responseBody) {
    console.log(responseBody);
    res.render('blogEdit', {
	title: 'Blog Edit',
	name: name,
	blog: responseBody
    });
};

module.exports.blogEdit = function (req, res) {
    var path = "/api/blogs/" + req.params.blogId;
    var requestOptions = {
	url: apiOptions.server + path,
	method: "GET",
	json: {}
    };

    request(
	requestOptions,
	function(err, response, body) {
	    renderEditPage(req, res, body);
	}
    );
};

module.exports.blogEditPost = function (req, res) {
    var path = "/api/blogs/" + req.params.blogId;
    var postData = {
	blogTitle: req.body.blogTitle,
	blogText:  req.body.blogText
    };
    var requestOptions = {
	url: apiOptions.server + path,
	method: "PUT",
	json: postData
    };

    request(
	requestOptions,
	function(err, response, body) {
	    if(response.statusCode === 200) {
		res.redirect('/blog/list');
	    }
	    else {
		console.log('error');
	    }
	}
    );
};

var renderDeletePage = function(req, res, responseBody) {
    res.render('blogDelete', {
	title: 'Blog Delete',
	name: name,
	blog: responseBody
    });
};

module.exports.blogDelete = function (req, res) {
    var path = "/api/blogs/" + req.params.blogId;
    var requestOptions = {
	url: apiOptions.server + path,
	method: "GET",
	json: {}
    };

    request(
	requestOptions,
	function(err, response, body) {
	    renderDeletePage(req, res, body);
	}
    );
};

module.exports.blogDeletePost = function (req, res) {
    var id = req.params.blogId;
    var path = '/api/blogs/' + id;
    var requestOptions = {
	url: apiOptions.server + path,
	method: "DELETE",
	json: {}
    };

    request(
	requestOptions,
	function(err, response, body) {
	    if(response.statusCode === 204) {
		res.redirect('/blog/list');
	    }
	    else {
		console.log('error');
	    }
	}
    );
};
