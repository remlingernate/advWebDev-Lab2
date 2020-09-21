var name = 'Nate Remlinger';

module.exports.blogList = function (req, res) {
    res.render ('blogList', {
	title: 'Blog List',
	name: name,
	blogs: [
	    { blogTitle: "Title!", blogText: "This is a blog. blog blog blog.", createdOn: new Date('2009-01-22T11:42:00'), id: 3 },
	    { blogTitle: "Santa?", blogText: "it's christmas?", createdOn: new Date('2006-12-25T00:00:09'), id:2 },
	    { blogTitle: "test post pls ignore", blogText: "oh no", createdOn: new Date('2004-05-20T23:22:40'), id: 1 }
	]
    });
};

module.exports.blogAdd = function (req, res) {
    res.render ('blogAdd', { title: 'Blog Add', name: name });
};

module.exports.blogEdit = function (req, res) {
    res.render ('blogEdit', { title: 'Blog Edit', name: name, id: req.query.id });
};

module.exports.blogDelete = function (req, res) {
    res.render ('blogDelete', { title: 'Blog Delete', name: name, id: req.query.id });
};
