(function() {
    angular
        .module('blogApp')
        .service('blogData', blogData);

    function blogData($http) {
        var blogList = function() {
            return $http.get('/api/blogs');
        };

        var blogById = function(blogId) {
            return $http.get('/api/blogs/' + blogId);
        };

        var editById = function(blogId, data) {
            return $http.put('/api/blogs/' + blogId, data);
        };

        var addById = function(data) {
            return $http.post('/api/blogs', data);
        };

        var deleteById = function(blogId) {
            return $http.delete('/api/blogs/' + blogId);
        };

        return {
            blogList: blogList,
            blogById: blogById,
            editById: editById,
            addById: addById,
            deleteById: deleteById
        };
    }
})();