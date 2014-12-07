bridges.factory('scriptService', ['$document', '$q', '$rootScope', function($document, $q, $rootScope) {
	return {
		loadScript: function(id, src) {
			var d = $q.defer();
			function onScriptLoad() {
				$rootScope.$apply(function() { d.resolve(); });
			}

			var footerJS = $document[0].getElementById('footerjs');
			var scriptTag = $document[0].getElementById(id);

			if (!scriptTag) {
				scriptTag = $document[0].createElement('script');
				scriptTag.parent = footerJS;
				scriptTag.type = 'text/javascript';
				scriptTag.async = true;
				scriptTag.id = id;

				footerJS.appendChild(scriptTag);
			}

			if (scriptTag.src != src) {
				scriptTag.src = src;
				scriptTag.onreadstatechange = function() {
					if (this.readState == 'complete') {
						onScriptLoad();
					}
				}
				scriptTag.onload = onScriptLoad;
			}
			else {
				onScriptLoad();
			}

			return d.promise;
		}
	}
}]);