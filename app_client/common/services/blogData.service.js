(function() {
    angular
        .module('blogApp')
        .service('blogData', blogData);

    function blogData($http, authentication) {
        var blogList = function() {
            return $http.get('/api/blogs');
        };

        var blogById = function(blogId) {
            return $http.get('/api/blogs/' + blogId);
        };

        var editById = function(blogId, data) {
            return $http.put('/api/blogs/' + blogId, data, { headers: { Authorization: 'Bearer ' + authentication.getToken() } });
        };

        var addById = function(data) {
            return $http.post('/api/blogs', data, { headers: { Authorization: 'Bearer ' + authentication.getToken() } });
        };

        var deleteById = function(blogId) {
            return $http.delete('/api/blogs/' + blogId, { headers: { Authorization: 'Bearer ' + authentication.getToken() } });
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