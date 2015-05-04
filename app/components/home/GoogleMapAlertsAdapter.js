/**
 * Data adapter for GoogleMap
 * Gets data for map markers.
 * This data is used for IYF viz
 * @author Jorge.Carmona@softwareag.com
 */
(function(ng) {
	'use strict';
	
	ng.module('MyApp').

	factory('GoogleMapAlertsAdapter', [
		
		'$filter', 'PrestoServices', 'CitiesAdapter', 'ViolationsDetailAdapter', 'errorHandler',
		function($filter, PrestoServices, CitiesAdapter, ViolationsDetailAdapter, errorHandler) {

			var getAlerts = function( config ) {
				var normalizedData = [],
					maxTotal = 0,
					maxAlert = 0,
					mapKPI = [],
					iyf = {},
					majorHubs = [],
					topCities = [];
				
				// get data from Presto
				PrestoServices.getREST( '/presto/edge/api/rest/radVaronis/getData?x-presto-resultFormat=json&callback=JSON_CALLBACK' ).
            		then(function( response ) {	
           		
            			var ds = new Miso.Dataset({
							data : ( angular.isArray( response['e:DataTable']['e:Entry'] ) ) ? response['e:DataTable']['e:Entry'] : [ response['e:DataTable']['e:Entry'] ]
						}).

						fetch({
							success : function() {
								// builds translation object for its client: (GoogleMapD3Layover) provider
								this.each(function( row ) {		
									// change property from Latitude/Longitude to the maps expected lat/lng
									// - - - - - - - - - - - - - - - - - - - - - - - -
									normalizedData.push({
										city    : row.City,
										total   : row.Total,
										normal  : row.Normal,
										warning : row.Warning,
										alert   : row.Alert,
										lat     : row.Latitude,
										lng     : row.Longitude
									});

									// Build datamodel for IYF (In Yo'Face) widget
									// create an Object with city as the key to easily reference it.
									// - - - - - - - - - - - - - - - - - - - - - - - -
									iyf = ViolationsDetailAdapter.getViolationsData(response);
								});	

								// Get Map KPI data
								// - - - - - - - - - - - - - - - - - - - - - - - -	
								mapKPI = CitiesAdapter.getMapKpiData( response );

						
								// MaxTotal is the sum of all values in Total column
								// - - - - - - - - - - - - - - - - - - - - - - - -	
								maxTotal = this.sum( 'Total' );	
							}
						});
						
						// return normalized data to callback function
						config.success({
							markersData: normalizedData, // for the map
							maxTotal: maxTotal,
							iyf: iyf,		// for the IYF visual
							mapKPI: mapKPI  // for the map KPI visual
						});
            		}).
            		// if something goes wrong return response with error
            		catch(function( response ) {
            			errorHandler.noServerAccessError( response );
            		});
			};

			return {
				getAlerts : getAlerts
			};
		}
	]);
})(angular);