bridges.controller('GalleryCtrl', ['$scope', '$http', '$state', '$controller', function($scope, $http, $state, $controller) {
	angular.extend(this, $controller('ApplicationCtrl', {$scope: $scope, $http: $http, $state: $state}))


}]);
	