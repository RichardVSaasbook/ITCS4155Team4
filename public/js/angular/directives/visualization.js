bridges.directive('bridgesVisualization', ['d3Service', 'scriptService', function(d3Service, scriptService) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			d3Service.d3().then(function(d3) {
				function updateVisualization(vistype) {
					var width = element.prop('offsetWidth');
					var height = element.prop('offsetHeight');
					var scriptSource;

					if (vistype == 'nodelink') {
						scriptSource = '/js/graph.js';
					}
					else if (vistype == 'tree') {
						scriptSource = '/js/bst/lib/bst.js';
					}
					else if (vistype == 'queue') {
						scriptSource = '/js/queue.js';
					}

					if (scriptSource) {
						scriptService.loadScript('visualizationScript', scriptSource).then(function() {
							if (d3.nodelink) {
								d3.nodelink(d3, attrs.id, width, height, scope.data);
								element.prop('scrollLeft', width / 4);
								element.prop('scrollTop', height / 4);
							}
							else if (d3.bst) {
								bst = d3.bst(d3, attrs.id, width, height);
								bst.make(scope.data);
								element.prop('scrollLeft', width / 4);
								element.prop('scrollTop', height / 4);
							}
							else if (d3.queue) {
								d3.queue(d3, attrs.id, width, height, scope.data.nodes);
							}
							else {
								element.prop('scrollLeft', width / 4);
								element.prop('scrollTop', height / 4);
							}
						});
					}
				}

				updateVisualization(attrs.bridgesVisualization);

				attrs.$observe('bridgesVisualization', function(vistype) {
					updateVisualization(vistype);
				});
			});
		}
	}
}]);