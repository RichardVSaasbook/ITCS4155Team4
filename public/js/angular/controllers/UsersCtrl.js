bridges.controller('UsersCtrl', ['$scope', '$http', '$state', '$controller', function($scope, $http, $state, $controller) {
	angular.extend(this, $controller('ApplicationCtrl', {$scope: $scope, $http: $http, $state: $state}))
	
	$http.get('/csrf').success(function(data) {
		$scope.csrftoken = data.csrf
	})

	$http.get('/flashLoginMessage').success(function(data) {
		$scope.message = data.message
	})

	$scope.checkUser = function() {
		var username = document.getElementById("input").value;
		var btn = document.getElementById("submit");
        if (username == $scope.user.username)
            btn.classList.remove('disabled');
        else {
            if (!(btn.classList.contains("disabled")))
                btn.classList.add("disabled");
        } 
	}
}])