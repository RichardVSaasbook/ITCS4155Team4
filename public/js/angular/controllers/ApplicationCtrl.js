bridges.controller('ApplicationCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
	$scope.user = {}
	$scope.isLoggedIn = false

	$http.get('/user-info').success(function(data) {
		$scope.user = data
		$scope.isLoggedIn = $scope.user.username != null
	})

	$scope.logout = function() {
		$scope.isLoggedIn = false
		$http.post("/logout").success(function() {
			$state.go("login")
		})
	}
}]);