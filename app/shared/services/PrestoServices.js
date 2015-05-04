/**
 * Service to get data from Presto mashups via $http
 * @author  Jorge.Carmona@softwareag.com
 */
(function(ng) {
	angular.module('MyApp').

		service('PrestoServices', function($http, $log, $q, APP_CONFIG) {
			return {
				getREST: getRESTfulService
			};

			// Presto server url is configured in app/plugins/services/appConfigService.js
			function getRESTfulService(url) {
				var request = $http.jsonp(APP_CONFIG.PRESTO_SERVER + url);
				
				return( 
					request.then( 
						_handleSuccess, 
						_handleError 
					)
				);
			}

			// Transform the successful response, unwrapping the application data
            // from the API response payload.
            function _handleSuccess( response ) {
            	return( response.data );
            }

            function _handleError( response ) {
            	return( $q.reject( response ) );
            }
		});		
})(angular);