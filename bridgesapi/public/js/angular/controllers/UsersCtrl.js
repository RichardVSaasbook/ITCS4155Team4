bridges.controller('UsersCtrl', ['$scope', '$http', '$state', '$controller', function($scope, $http, $state, $controller) {
	angular.extend(this, $controller('ApplicationCtrl', {$scope: $scope, $http: $http, $state: $state}))
	
	$http.get('/csrf').success(function(data) {
		$scope.csrftoken = data.csrf
	})

	$http.get('/flashLoginMessage').success(function(data) {
		$scope.message = data.message
	})
}])