bridges.controller('UserLogoutCtrl', ['$scope', '$http', '$controller', '$state', function($scope, $http, $controller, $state) {
	angular.extend(this, $controller('ApplicationCtrl', {$scope: $scope, $http: $http}))
	
	$scope.isLoggedIn = false
	$scope.isNotLoggedIn = true
	$http.post("/logout").success(function() {
		$state.go("login")
	})
}])