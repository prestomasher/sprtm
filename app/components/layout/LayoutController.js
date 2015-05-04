/**
 * Main Entry point
 * @author Jorge.Carmona@softwareag.com
 */
(function(ng) {
	'use strict';
	
	angular.module('MyApp', [
		'ngRoute',
		'lfw-components',
		'angular-loading-bar',
		'ngAnimate',
		'ngSanitize',
		'mm.foundation'
		])
		.config(['$routeProvider',
			function($routeProvider) {
				$routeProvider
					.when('/login',  { templateUrl : 'app/components/login/layout.html' })
					.when('/home' ,  { templateUrl: 'app/components/home/layout.html', controller: "HomeController" })
					.when('/social' ,  { templateUrl: 'app/components/social/layout.html', controller: "SocialController" })
					.otherwise({ redirectTo: '/home' });
		}]).

		// offset filter used by pagers. This can be shared by any pagers
		filter('offset', function() {

	        return function(input, start) {
	            start = parseInt(start, 10);
	             
	            return input.slice(start);
	        };

	    }).

	    run(function($rootScope, $location, $log, appModel, PrestoAuthAdapter) {
			$rootScope.$on( "$routeChangeStart", function( event, next, current ) {
				PrestoAuthAdapter.getUserDetails();
			});
		}).

		controller('LayoutController', [

			'$scope', '$rootScope', '$routeParams', '$log', 'APP_CONFIG', 'appModel', 'PrestoServices', '$location', '$interval', 'PrestoAuthAdapter', 'LayoutHelper',
			function($scope, $rootScope, $routeParams, $log, APP_CONFIG, appModel, PrestoServices, $location, $interval, PrestoAuthAdapter, LayoutHelper) {
			
				//Config
				$scope.appTitle = APP_CONFIG.APP_TITLE;
				$scope.icons = APP_CONFIG.APP_ICONS;

				// //Labels
				$scope.labels = appModel.dictionary;
				$rootScope.activeSession = false;

				$scope.dbData = {
					// used to hold variables that dictate behavior of ui elements
					metadata: {
						user: {
							firstName: '',
							lastName: '',
							role: '',
							thumb: ''
						},
						layout: {
							logo: $scope.icons.logo,
							currentBreadCrumb: 'Home',
							pageTitle: $scope.labels.homeTitle,
							pageDescription: $scope.labels.homeSubtitle,
							pageIcon: $scope.labels.homeIcon
						}
					},
					// used to hold page public data
					data: {
						headMenu: {
							menu1Cnt: 4,
							menu2Cnt: 10
						}
					}
				};			

				$scope.logout = function() {
					PrestoAuthAdapter.logout();
				};

				$scope.setPageMetadata = function( page ) {
					LayoutHelper.setLayoutMetadata( $scope, page );
				};
				
				// listeners
				// - - - - - - - - - - - - - - - - - -- - - 
				$scope.$on('userReady', function() {
					$scope.dbData.metadata.user = appModel.getLocalCache().user;
				});

				// Check user login on load of app
				$scope.$on('$viewContentLoaded', function(){
					
				});
		}]);
})(angular);