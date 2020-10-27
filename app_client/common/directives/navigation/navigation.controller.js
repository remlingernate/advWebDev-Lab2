(function() {
    angular
        .module('blogApp')
        .controller('navigationCtrl', navigationCtrl);

    navigationCtrl.$inject = ['authentication', '$window'];

    function navigationCtrl(authentication, $window) {
        var vm = this;
        vm.currentPath = $window.location.pathname;

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.currentUser = authentication.currentUser();

        vm.logout = function() {
            authentication.logout();
            $window.location.assign('/');
        };
    }
})();