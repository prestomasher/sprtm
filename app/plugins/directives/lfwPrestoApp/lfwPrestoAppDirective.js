/**
 * Presto App Directive
 * Embeds a presto app or presto Workspace app
 */
(function(ng) {

	angular.module('lfw-components', []).

		
		directive( 'lfwPrestoApp', function() {
			
			return {
				restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
				transclude: true,
				scope: {
					title: '@',
					id: '@',
					height: '@',
					server: '@'
				},
				template:   '<div class="responsive-panel">'+
								'<div class="titlebar">'+
									'<span class="title"> {{title}} </span>'+
								'</div>'+
								'<div class="panel-body"></div>'+
							'</div>',
				link: function( scope, elem, attrs ){
					
					var script = document.createElement('script');
						script.src = scope.server +"/presto/hub/mashlet/"+ scope.id +"?height="+ scope.height +"&width=100%25&refreshinterval=0&hideheader=true&standalone=false";
					
					elem.find( '.panel-body' ).append( script );
				}
			};

		});

		
})(angular);

