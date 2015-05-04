/**
 * Pluggable Data Adapter for loging into a Presto server
 * @author Jorge.Carmona@softwareag.com
 */
(function(ng) {
	ng.module('MyApp').

	factory('PrestoAuthAdapter', [

		'$rootScope', '$log', '$location', 'PrestoServices', 'errorHandler', 'appModel',
		function( $rootScope, $log, $location, PrestoServices, errorHandler, appModel ) {

			// data model
			var model = appModel;
			
			/**
			 * Login to Presto server
			 * @param  {String} user username
			 * @param  {String} pass password
			 * @scope  {JSON}   scope ng scope in login controller
			 * @return {JSON}   response object with authToken if success
			 *                  otherwise empty string ""   
			 */
			var login = function( user, pass, scope ) {
				PrestoServices.getREST(
					'/presto/edge/api?inputStream={'+
						'"sid": "UserManagerService",'+
						'"oid": "login",'+
						'"svcVersion": "0.1",'+
						'"version": "1.1",'+
						'"params": ["'+ user +'","'+ pass + '"]'+
					'}&callback=JSON_CALLBACK'
				).
				// if all goes well return response with data
				then(function( authResponse ) {	
					if( authResponse.response.authToken ) {
						$rootScope.activeSession = true;
						$location.path( "/" );
					} else {
						$rootScope.activeSession = false;
						scope.loginFrm.loginError = true;
					}
				}).
				// if something goes wrong return response with error
				catch(function( authResponse ) { 
					scope.loginFrm.serverError = true;
					errorHandler.noServerAccessError( authResponse );
				});
			};

			/**
			 * Logout from Presto server
			 * @return {String} "JBPSASCE0741 - Logout Success" message if logout successful
			 */
			var logout = function() {
				PrestoServices.getREST(
						'/presto/edge/api?inputStream={'+
						'"sid": "UserManagerService",'+
						'"oid": "logout",'+
						'"svcVersion": "0.1",'+
						'"version": "1.1",'+
						'"params": []'+
					'}'+
					'&callback=JSON_CALLBACK'
				).
				// if all goes well return response with data
				then(function( response ) {
					if( response.response === "JBPSASCE0741 - Logout Success" ) {							
						$rootScope.activeSession = false;		
						$location.path( '/login' );
					}
				}).
				// if something goes wrong return response with error
				catch(function( response ) {
					errorHandler.noServerAccessError( response );
				});	
			};

			/**
			 * Fetches user details from the Presto server
			 * @return {JSON} Object with user details
			 */
			var getUserDetails = function() {
				PrestoServices.getREST('/presto/edge/api/rest/addUsersDetailstoSession/Invoke?x-presto-resultFormat=json&callback=JSON_CALLBACK').
					// if all goes well return response with data
					then(function( response ) {
						// Presto session active and user returned
						if( response.JBUser ) {
							// set user info to local cache and local scope
							model.setLocalCache( "user", response.JBUser );
							
							$rootScope.$broadcast( 'userReady' );

							// set activeSession to true so framework knows to display elements
							$rootScope.activeSession = true;
						} else {
						// Presto session not found
							if( response.PrestoResponse ) {
								// This error is returned if there are Presto apps in the current page and there is no active Presto session
								var error = response.PrestoResponse.PrestoError.ErrorDetails;

								errorHandler.noPrestoSessionWithAppsError( error );
								$rootScope.activeSession = false;

							} else {
								// this error is returned if there is no current active Presto session
								errorHandler.noPrestoSessionError( response );
							}

							// if error, reroute to login
							$location.path( 'login' );
						}
					}).
					// if something goes wrong return response with error
					catch(function(response) {
						errorHandler.noServerAccessError( response );
						$rootScope.activeSession = false;

						$location.path( '/login' );
					});
			};

			return {
				login          : login,
				logout         : logout,
				getUserDetails : getUserDetails
			};
		}
	]);
})(angular);