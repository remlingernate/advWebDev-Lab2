(function() {
    angular
        .module('blogApp')
        .controller('listCtrl', listCtrl)
        .filter('formatDate', formatDate);

    function listCtrl(blogData, $uibModal, authentication) {
        var vm = this;

        blogData.blogList()
            .then(function successCallback(response) {
                vm.data = {
                    blogs: response.data,
                    title: 'Blog List'
                };
            }, function errorCallback(response) {
                vm.data = {
                    title: 'Blog List, but something went wrong',
                    blogs: []
                };
            });

        vm.popupDeleteForm = function(id) {
            var modalInstance = $uibModal.open({
                templateUrl: '/blog/delete/delete.view.html',
                controller: 'deleteCtrl as vm',
                resolve: {
                    id: function() {
                        return id;
                    }
                }
            });

            modalInstance.result.then(function() {
                var item = vm.data.blogs.find(x => x._id === id);
                var index = vm.data.blogs.indexOf(item);

                vm.data.blogs.splice(index, 1);
            });
        };

        vm.popupEditForm = function(id) {
            var modalInstance = $uibModal.open({
                templateUrl: '/blog/edit/edit.view.html',
                controller: 'editCtrl as vm',
                resolve: {
                    id: function() {
                        return id;
                    }
                }
            });

            modalInstance.result.then(function(data) {
                vm.data.blogs.push(data.data);

                var item = vm.data.blogs.find(x => x._id === id);
                var index = vm.data.blogs.indexOf(item);

                vm.data.blogs.splice(index, 1);
            });
        };

        vm.isLoggedIn = authentication.isLoggedIn();
    }

    function formatDate() {
        return function(date) {
            var dateObj = new Date(date);
            return dateObj.toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' });
        };
    }
})();