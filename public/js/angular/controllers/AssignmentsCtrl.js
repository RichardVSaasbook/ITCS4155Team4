bridges.controller('AssignmentsCtrl', ['$scope', '$http', '$state', '$controller', '$stateParams', 
	function($scope, $http, $state, $controller, $stateParams) {
		angular.extend(this, $controller('ApplicationCtrl', {$scope: $scope, $http: $http, $state: $state}));

		$http.get('/assignments/' + $stateParams.assignmentID + '/' + $stateParams.username).success(function(data) {
			$scope.data = data.data;
			$scope.vistype = data.vistype;
			$scope.shared = data.shared;
			$scope.owner = data.owner;
			
			if ($scope.owner) {
				$scope.visualizationStyle="{width: 90%}";
			}

			if ($scope.vistype == "nodelink") {
				$scope.isNodelink = true;
			}
			else if ($scope.vistype == "tree") {
				$scope.isTree = true;
			}
			else if ($scope.vistype == "queue") {
				$scope.isQueue = true;
			}
		})

		$scope.assignmentID = $stateParams.assignmentID;

		$scope.toggleShare = function(selected) {
			$http.post('/assignments/' + $scope.assignmentID + '/share/' + selected).success(function() {
				console.log("Visibility updated.");
			}).error(function(error) {
				errorMessage = JSON.parse(error.responseText);
				console.log('Error: ' + errorMessage.error);
			});
		};

		$scope.setVisualizationType = function(selected) {
			$http.post('/assignments/' + $scope.assignmentID + '/vistype/' + selected).success(function() {
				console.log("Visualization type updated");
			}).error(function(error) {
				var errorMessage = JSON.parse(error.responseText);
				console.log('Error: ' + errorMessage.error);
			});
		};
	}
]);	