/* GET home page */
module.exports.index = function (req, res) {
    var name = 'Nate Remlinger';
    res.render('index', { name: name, title: name + ' Blog Site' });
};
