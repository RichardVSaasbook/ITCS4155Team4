bridges.controller('GalleryCtrl', ['$scope', '$http', '$state', '$controller', '$stateParams', 
	function($scope, $http, $state, $controller, $stateParams) {
	angular.extend(this, $controller('ApplicationCtrl', {$scope: $scope, $http: $http, $state: $state}))

	$scope.users = [{username: "foo"}, {username: "bar"}]
	$scope.assignmentID = $stateParams.assignmentID
//	$http.get('/gallery').success(function(data)	})
}]);
	