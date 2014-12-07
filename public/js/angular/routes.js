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
	.state("user-home", {
		url: "/home",
		controller: 'UsersCtrl',
		views: {
			"content": {templateUrl: "/angular_templates/users/layout.html", controller: 'UsersCtrl'},
			"form@user-home": {templateUrl: "/angular_templates/users/profile/form.html", controller: 'UsersCtrl'},
			"info@user-home": {templateUrl: "/angular_templates/users/profile/info.html", controller: 'UsersCtrl'}
		},
		css: ['/css/webicons/webicons.css', '/css/inactive.css'],
		js: ['/components/modernizr/modernizr.js', '/components/jquery/dist/jquery.min.js', '/js/main.js']
	})
	.state("404", {
		url: "/404",
		views: {
			"content": {templateUrl:"/angular_templates/404.html"}
		},
		css: "/css/404.css"
	})
	.state("gallery",{
		url: "/assignments/:assignmentID",
		views: {
			"content": {templateUrl:"/angular_templates/assignments/gallery.html", controller: 'GalleryCtrl'}
		}
	})
	.state("assignment",{
		url: "/assignments/:assignmentID/:username",
		views: {
			"content": {templateUrl:"/angular_templates/assignments/assignment/content.html", controller: 'AssignmentsCtrl'}
		},
		css: ["/css/assignment.css", "/components/css-toggle-switch/dist/toggle-switch.css"]
	})
})