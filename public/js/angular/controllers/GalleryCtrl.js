bridges.controller('GalleryCtrl', ['$scope', '$http', '$state', '$controller', '$stateParams', 
	function($scope, $http, $state, $controller, $stateParams) {
		angular.extend(this, $controller('ApplicationCtrl', {$scope: $scope, $http: $http, $state: $state}));

		$http.get('/assignments/' + $stateParams.assignmentID).success(function(data) {
			$scope.usernames = data.usernames
		})

		$scope.assignmentID = $stateParams.assignmentID;
	}
]);	