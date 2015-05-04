/**
 * Panel Directive
 * This 
 * @dependencies 
 * 		'APP_CONFIG' constant. This is found on the App.Config module in appConfigService.js
 * 		'PrestoServices' service. This is found on the SAGPresto module in PrestoServices.js
 */
(function(ng) {
	angular.module('lfw-components', []).
		// controller('sagPanelController', function( $scope ) {
		// 	$scope.panelTitle = 'jorge';

		// 	console.log("3333", $scope.panelTitle);
		// }).
		
		directive( 'lfwPanel', function($log) {
			
			return {
				restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
				transclude: true,
				scope: {},
				// template: '<div class="responsive-panel">'+
							
				// 			'<div class="titlebar" ng-transclude></div>'+

				// 			'<div class="panel-body">hello</div>'+

				// 		  '</div>'
				templateUrl: 'app/plugins/directives/lfwPanel/lfwPanelTpl.html',
				link: function( scope, elem, attrs, ctrl, transclude ) {
									
					transclude(function(clone) {

						angular.forEach(clone, function(cloneEl) {
	console.log("trns", cloneEl);
							var destinationId = cloneEl.attributes["transclude-to"].value;
							var destination = elem.find('[transclude-id="'+ destinationId +'"]');
							
							if (destination.length) {
								destination.append(cloneEl);
							} else { 
								cloneEl.remove();
							}
						});

					});
				}
			};

		});

		// directive( 'panelTitlebar', function() {

		// 	return {
		// 		require: '^lfwPanel',
		// 		restrict: 'E',
		// 		transclude: true,
		// 		scope: {
		// 			panelTitle: '@title'
		// 		},
		// 		template: '<span class="title">{{panelTitle}}</span>'
		// 	};

		// }).

		// directive( 'panelBody', function() {

		// 	return {
		// 		require: '^lfwPanel',
		// 		restrict: 'E',
		// 		transclude: true,
		// 		// scope: {
		// 		// 	panelTitle: '@title'
		// 		// },
		// 		replace: true,
		// 		template: '<div class="body" ng-transclude></div>'
		// 	};

		// });

		
})(angular);

