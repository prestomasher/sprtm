/**
 * Controller for Social page
 * @author  Jorge.Carmona@softwareag.com
 */
(function(ng) {
	'use strict';
	
	angular.module('MyApp').

		controller('SocialController', [

			'$log', '$scope', '$rootScope', 'appModel', 'APP_CONFIG',
			function($log, $scope, $rootScope, appModel, APP_CONFIG) {
			// public
			// - - - - - - - - - - - - - - - - - - - - - - -
				$scope.labels = appModel.dictionary;
				$scope.filterTemplate = 'app/components/home/filters.html';

				$scope.server = APP_CONFIG.PRESTO_SERVER;

			// private
			// - - - - - - - - - - - - - - - - - - - - - - -
				
				
				// listeners
				// - - - - - - - - - - - - - - - - - - -
				$scope.$on('$viewContentLoaded', function(){
					
				});

				// cleanup before exiting page
	            //- - - - - - - - - - - - - - - - - - - - - 
	            $scope.$on("$locationChangeStart", function(event) {

	            });
			}
		]);					
})(angular);