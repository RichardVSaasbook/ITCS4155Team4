var bridges = angular.module('bridges', ['ui.router']);

bridges.config(function($stateProvider, $urlRouterProvider) {
	/*$urlRouterProvider.when("/logout", ['$state', '$http', function($state, $http) {
		$http.post("/logout").success(function() {
			$state.go("login")
		})
	}])*/

	$stateProvider
	.state("home", {
		url: "",
		views: {
			"content": {templateUrl: "/angular_templates/home/index.html", controller: 'ApplicationCtrl'}
		}
	})
	.state("login", {
		url: "/login",
		views: {
			"content": {templateUrl: "/angular_templates/users/layout.html", controller: 'UsersCtrl'},
			"form@login": {templateUrl: "/angular_templates/users/login/form.html", controller: 'UsersCtrl'},
			"validate@login": {templateUrl: "/angular_templates/users/login/validate.html", controller: 'UsersCtrl'}
		}
	})
	.state("signup", {
		url: "/signup",
		controller: 'UsersCtrl',
		views: {
			"content": {templateUrl: "/angular_templates/users/layout.html", controller: 'UsersCtrl'},
			"form@signup": {templateUrl: "/angular_templates/users/signup/form.html", controller: 'UsersCtrl'}
		}
	})
})