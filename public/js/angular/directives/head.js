bridges.directive("head", ["$rootScope", "$compile",
	function($rootScope, $compile) {
		return {
			restrict: "E",
			link: function(scope, element) {
				var css = '<link rel="stylesheet" type="text/css" data-ng-repeat="url in cssUrls" data-ng-href="{{ url }}" />';
				var js = '<script type="text/javascript" data-ng-repeat="url in jsUrls" data-ng-src="{{ url }}"></script>';
				elem.append($compile(css)(scope));
				elem.append($compile(js)(scope));
				scope.cssUrls = [];
				scope.jsUrls = [];
				
				$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams {
					scope.cssUrls = [];
					scope.jsUrls = [];

					if (toParams.css) {
						var css = toParams.css;
						if (!angular.isArray(css)) {
							css = [css];
						}
						angular.forEach(css, function(stylesheet) {
							scope.cssUrls.push(stylesheet);
						});
					}

					if (toParams.js) {
						var js = toParams.js;
						if (!angular.isArray(js)) {
							js = [js];
						}
						angular.forEach(js, function(script) {
							scope.jsUrls.push(script);
						});
					}
				});
			}
		}
	}
]);