/**
 * Error Handling Factory 
 * This factory handles errors in the form of printing the error messages to the console. 
 * It is used to centralize all messages used in the app in one place.
 * @author Jorge.Carmona@softwareag.com
 */
(function(ng) {
	ng.module('MyApp').

	factory('errorHandler', [
		
		'$log',	'appModel',	
		function($log, appModel) {

			// Error strings are defined in this model
			var model = appModel.dictionary;

			/**
			 * This error will be triggered when the server cannot be accessed.
			 * @param  {JSON} error returned by the server in the catch part of the try/catch block
			 */
			var noServerAccessError = function( error ) {
				$log.error( model.serverErrorReported + error.status );
				$log.error( model.checkConnection );
			};

			var noPrestoSessionWithAppsError = function( error ) {
				$log.error("[" + error.message + "] " + error.details);
				$log.error( model.tryAuthenticating );
			};

			var noPrestoSessionError = function( error ) {
				$log.error( model.appAuthError, response.status, " at url: ", response.config.url);
				$log.error( model.tryAuthenticating );
			};

			return {
				noServerAccessError          : noServerAccessError,
				noPrestoSessionWithAppsError : noPrestoSessionWithAppsError,
				noPrestoSessionError         : noPrestoSessionError
			};
		}
	]);
})(angular);