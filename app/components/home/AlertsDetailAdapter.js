/**
 * Data adapter for GoogleMap
 * Gets data for map markers.
 * This data is used for IYF viz
 * @author Jorge.Carmona@softwareag.com
 */
(function(ng) {
	'use strict';
	
	ng.module('MyApp').

	factory('AlertsDetailAdapter', [
		
		'$filter', 'PrestoServices', 'errorHandler',
		function($filter, PrestoServices, errorHandler) {

			var getAlertsBySeverityType = function( options ) {
				
				// get data from Presto
				PrestoServices.getREST( '/presto/edge/api/rest/varonis_alert_details_filtered/Invoke?x-presto-resultFormat=json&severity='+ options.severity +'&city='+ options.city +'&callback=JSON_CALLBACK' ).
            		then(function( response ) {
            			var dataArray = ( angular.isArray( response['e:DataTable']['e:Entry'] ) ) ? response['e:DataTable']['e:Entry'] : [ response['e:DataTable']['e:Entry'] ],
            				normalizedData = [];

            			var ds = new Miso.Dataset({
							data : dataArray
						}).

						fetch({
							success : function() {
								// builds translation object for its client: (GoogleMapD3Layover) provider
								this.each(function( row ) {		
									// change property from Latitude/Longitude to the maps expected lat/lng
									// - - - - - - - - - - - - - - - - - - - - - - - -
									normalizedData.push({
										col1 : row.ID,
										col2 : row.CITY,
										col3 : row.GROUP_NAME,
										col4 : row.REGION,
										col5 : row.SERVER,
										col6 : row.USER_NAME
									});
								});
							}
						});

           				return options.success( normalizedData );
            		}).
            		// if something goes wrong return response with error
            		catch(function( response ) {
            			errorHandler.noServerAccessError( response );
            		});
			};

			return {
				getAlertsBySeverityType : getAlertsBySeverityType
			};
		}
	]);
})(angular);