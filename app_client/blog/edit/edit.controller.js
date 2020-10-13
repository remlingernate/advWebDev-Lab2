(function() {
    angular
        .module('blogApp')
        .controller('editCtrl', editCtrl);

    function editCtrl(blogData, $uibModalInstance, id) {
        var vm = this;

        vm.modal = {
            cancel: function() {
                $uibModalInstance.dismiss('cancel');
            },
            close: function(result) {
                $uibModalInstance.close(result);
            }
        };

        vm.onSubmit = function() {
            vm.formError = "";

            if (!vm.data.blog.blogTitle || !vm.data.blog.blogText) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doEditBlog(id, vm.data.blog);
            }
        };

        vm.doEditBlog = function(blogId, formData) {
            blogData.editById(blogId, {
                    blogTitle: formData.blogTitle,
                    blogText: formData.blogText
                })
                .then(
                    function successCallback(response) {
                        vm.modal.close(response);
                    },
                    function errorCallback(response) {
                        vm.formError = "Blog edit was not saved, try again";
                    }
                );
            return false;
        };

        blogData.blogById(id)
            .then(
                function successCallback(response) {
                    vm.data = {
                        blog: response.data,
                        title: 'Blog Edit'
                    };
                },
                function errorCallback(response) {
                    vm.data = {
                        blog: null,
                        title: 'Blog Edit, but something went wrong'
                    };
                }
            );
    }
})();