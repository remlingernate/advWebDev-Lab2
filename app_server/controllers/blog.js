module.exports.blogList = function (req, res) {
    res.render ('blogList', { title: 'Blog List', name: 'Nate Remlinger' });
};

module.exports.blogAdd = function (req, res) {
    res.render ('blogAdd', { title: 'Blog Add', name: 'Nate Remlinger' });
};
