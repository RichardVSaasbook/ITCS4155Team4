bridges.factory('d3Service', ['$document', '$q', '$rootScope', function($document, $q, $rootScope) {
	var d = $q.defer();
	function onScriptLoad() {
		$rootScope.$apply(function() { d.resolve(window.d3); });
	}

	var scriptTag = $document[0].createElement('script');
	scriptTag.type = 'text/javascript';
	scriptTag.async = true;
	scriptTag.src = '/components/d3/d3.min.js';
	scriptTag.onreadstatechange = function() {
		if (this.readState == 'complete') {
			onScriptLoad();
		}
	}
	scriptTag.onload = onScriptLoad;

	$document.find('body').append(scriptTag);

	return {
		d3: function() { return d.promise; }
	}
}]);