(function() {
    angular
        .module('blogApp')
        .controller('deleteCtrl', deleteCtrl);

    function deleteCtrl(blogData, $uibModalInstance, id) {
        var vm = this;

        vm.modal = {
            cancel: function() {
                $uibModalInstance.dismiss('cancel');
            },
            close: function() {
                $uibModalInstance.close();
            }
        };

        vm.onSubmit = function() {
            vm.doDeleteBlog(id);
        };

        vm.doDeleteBlog = function(blogId) {
            blogData.deleteById(blogId)
                .then(
                    function successCallback(response) {
                        vm.modal.close();
                    },
                    function errorCallback(response) {
                        vm.formError = "Blog delete was not saved, try again";
                    }
                );
            return false;
        };

        blogData.blogById(id)
            .then(
                function successCallback(response) {
                    vm.data = {
                        blog: response.data,
                        title: 'Blog Delete'
                    };
                },
                function errorCallback(response) {
                    vm.data = {
                        blog: null,
                        title: 'Blog Delete, but something went wrong'
                    };
                }
            );
    }
})();