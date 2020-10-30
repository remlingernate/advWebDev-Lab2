(function() {
    angular
        .module('blogApp')
        .controller('addCtrl', addCtrl);

    function addCtrl($window, blogData, authentication) {
        var vm = this;

        vm.data = {
            blog: {
                blogTitle: '',
                blogText: ''
            },
            title: 'Blog Add'
        };

        vm.formError = '';

        vm.onSubmit = function() {
            vm.formError = '';

            if (!vm.data.blog.blogTitle || !vm.data.blog.blogText) {
                vm.formError = "All fields are required, try again";
                return false;
            } else {
                vm.doAddBlog(vm.data.blog);
            }
        };

        vm.doAddBlog = function(formData) {
            var currentUser = authentication.currentUser();

            if (currentUser == null) {
                vm.formError = "Please log in before attempting to add a blog";
                return;
            }

            blogData.addById({
                    blogTitle: formData.blogTitle,
                    blogText: formData.blogText,
                    authorName: currentUser.name,
                    authorEmail: currentUser.email
                })
                .then(
                    function successCallback(response) {
                        $window.location.assign('/blog/list');
                    },
                    function errorCallback(response) {
                        vm.formError = "Blog add was not saved, try again";
                    }
                );
            return false;
        };
    }
})();