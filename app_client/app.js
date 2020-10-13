(function () {
    angular.module('blogApp', ['ngRoute', 'ui.bootstrap']);

    function config ($routeProvider, $locationProvider) {
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
	    .otherwise({redirectTo: '/'});
	
	$locationProvider.html5Mode(true);
    }

    angular
	.module('blogApp')
	.config(['$routeProvider', '$locationProvider', config]);
}) ();
