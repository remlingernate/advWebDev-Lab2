(function() {
    angular
        .module('blogApp')
        .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$location', 'authentication'];

    function loginCtrl($location, authentication) {
        var vm = this;
        vm.pageHeader = {
            title: 'Sign in to Blogger'
        };
        vm.credentials = {
            email: "",
            password: ""
        };
        vm.returnPage = $location.search().page || '/';
        vm.onSubmit = function() {
            vm.formError = "";
            if (!vm.credentials.email || !vm.credentials.password) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doLogin();
            }
        };
        vm.doLogin = function() {
            vm.formError = "";
            authentication
                .login(vm.credentials)
                .then(
                    function successCallback(response) {
                        authentication.saveToken(response.data.token);
                        $location.search('page', null);
                        $location.path(vm.returnPage);
                    },
                    function errorCallback(err) {
                        vm.formError = err.data.message;
                    }
                );
        };
    }
})();