bridges.controller('UsersCtrl', ['$scope', '$http', '$controller', function($scope, $http, $controller) {
	angular.extend(this, $controller('ApplicationCtrl', {$scope: $scope, $http: $http}))
	
	$http.get('/csrf').success(function(data) {
		$scope.csrftoken = data.csrf
	})

	$http.get('/flashLoginMessage').success(function(data) {
		$scope.message = data.message
	})
}])