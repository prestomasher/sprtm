/**
 * Controller for login
 * @author  Jorge.Carmona@softwareag.com
 */
(function(ng) {
	angular.module('MyApp').
		controller('LoginController', [

			'$scope', '$rootScope', '$location', '$log', 'PrestoServices', 'appModel', 'PrestoAuthAdapter',			
			function ($scope, $rootScope, $location, $log, PrestoServices, appModel, PrestoAuthAdapter){

				//Labels
				$scope.labels = appModel.dictionary;
				$scope.loginFrm = {
					user        : "",
					pass        : "",
					loginError  : true,
					serverError : true
				};

				/**
				 * Call login method from LoginAdapter
				 * @param  {String} user username
				 * @param  {String} pass password
				 * @return {JSON}      server reponse
				 */
				$scope.login = function( user, pass ) {
					PrestoAuthAdapter.login( user, pass, $scope );
				};
			}
		]);
		
})(angular);