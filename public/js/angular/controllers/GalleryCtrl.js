bridges.controller('GalleryCtrl', ['$scope', '$http', '$state', '$controller', '$stateParams', 
	function($scope, $http, $state, $controller, $stateParams) {
		angular.extend(this, $controller('ApplicationCtrl', {$scope: $scope, $http: $http, $state: $state}));

		$scope.assignmentID = $stateParams.assignmentID;

		if ($state.current.type == "username") {
			$scope.username = $stateParams.username;

			$http.get('/' + $stateParams.username + '/assignments').success(function(data) {
				$scope.data = data.data
			});
		}
		else {
			$http.get('/assignments/' + $stateParams.assignmentID).success(function(data) {
				$scope.data = data.data
			});
		}
	}
]);	