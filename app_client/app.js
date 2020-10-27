(function() {
    angular.module('blogApp', ['ngRoute', 'ui.bootstrap']);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/blog/list', {
                templateUrl: 'blog/list/list.view.html',
                controller: 'listCtrl',
                controllerAs: 'vm'
            })
            .when('/blog/add', {
                templateUrl: 'blog/add/add.view.html',
                controller: 'addCtrl',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'auth/register/register.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'auth/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(true);
    }

    angular
        .module('blogApp')
        .config(['$routeProvider', '$locationProvider', config]);
})();