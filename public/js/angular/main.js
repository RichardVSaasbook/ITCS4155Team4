var bridges = angular.module('bridges', ['ui.router']);

bridges.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/404')

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
	.state("404", {
		url: "/404",
		views: {
			"content": {templateUrl:"/angular_templates/404.html"}
		}
	})
			
})