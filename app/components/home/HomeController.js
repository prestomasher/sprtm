/**
 * Controller for Home page
 * @author  Jorge.Carmona@softwareag.com
 */
(function(ng) {
	'use strict';
	
	angular.module('MyApp').

		// Config runs first and is used to preprocess objects and functions
		config(['$provide', 'GoogleMapStyleProvider',

			function( $provide, GoogleMapStyleProvider ){
				// Draw and style map
				$provide.decorator('GoogleMap', function( $delegate ){

					/**
					 * Decorate the GoogleMap factory with the init method and
					 * set some properties previous to drawing map
					 * @param  {String} container container where map will be drawn
					 */
					$delegate.init = function( container ) {
						$delegate.setZoom( 2 );
						$delegate.setCenterLat( 28.6908333333 );
						$delegate.setCenterLng( 39.14055555556 );

						$delegate.draw( container );
						GoogleMapStyleProvider.getMapStyle( 'DarkTheme', $delegate.getMap() );
					};

					return $delegate;
				});

				$provide.decorator('GoogleMapD3Layover', function( $delegate ) {
					
				    return $delegate;
				});
			}
		]).

		controller('HomeController', [

			'$log', '$scope', '$rootScope', 'appModel', 'APP_CONFIG', 'GoogleMap', 'GoogleMapAlertsAdapter', 'GoogleMapD3Layover', 'AlertsDetailAdapter',
			function($log, $scope, $rootScope, appModel, APP_CONFIG, GoogleMap, GoogleMapAlertsAdapter, GoogleMapD3Layover, AlertsDetailAdapter) {
			// public
			// - - - - - - - - - - - - - - - - - - - - - - -
				$scope.labels = appModel.dictionary;
				$scope.filterTemplate = 'app/components/home/filters.html';

				$scope.server = APP_CONFIG.PRESTO_SERVER;

				$scope.dbData = {
					// used to hold variables that dictate behavior of ui elements
					metadata: {
						paginator: {
			                totalItems: 0,
			                currentPage: 1,
			                itemsPerPage: 7
			            }	
					},
					// used to hold page public data
					data: {						
						// map
						map: {
							lat: 0.0,
							lng: 0.0,
							size: 0,
							color: '',
							caption: '',
							tip: '',
							cities: {}
						},

						// map metrics
						mapKPI: [],
						
						// data model for the IYF (In Yo'Face) widget
						// view GoogleMapAlertsAdapter for iyf schema
						iyf: {
							city: '[ click on a city in the map ]',
							groupItems: [{
								icon: 'fi-x',
								value: 0,
								color: 'status-icon-alert',
								type: 'alert',
								stats: 'select a city on the map to view violations'
							},{
								icon: 'fi-alert',
								value: 0,
								color: 'status-icon-warning',
								type: 'warning',
								stats: 'select a city on the map to view violations'
							},{
								icon: 'fi-check',
								value: 0,
								color: 'status-icon-success',
								type: 'normal',
								stats: 'select a city on the map to view violations'
							}]
						},
						
						grid: {
							total: 0,
							detail: [ { col1: $scope.labels.noData } ] 
						}
					}
				};

				$scope.setGridData = function( data ) {
					$scope.dbData.data.grid.detail = data;
					$scope.dbData.metadata.paginator.totalItems = data.length;
				};

				$scope.showAlertsByAlertType = function( violation ) {
					AlertsDetailAdapter.getAlertsBySeverityType({
						city: violation.city,
						severity: violation.type,
						success: $scope.setGridData
					});
				};

				$scope.toggleVisibility = function( severity ) {
					GoogleMapD3Layover.toggleMarkersVisibility( severity );
				};

				$scope.viewViolationsDetail = function( city ) {
					$scope.safeApply(function() {
						$scope.dbData.data.iyf = $scope.dbData.data.map.cities[ city ];
						// reset grid
						$scope.dbData.data.grid.detail = [ { col1: $scope.labels.noData } ];
						$scope.dbData.metadata.paginator.totalItems = 0;
					});
				};

				// Move this to a global helper to share
				$scope.safeApply = function(fn) {
					var phase = this.$root.$$phase;
					
					if(phase == '$apply' || phase == '$digest') {
						if(fn && (typeof(fn) === 'function')) {
							fn();
						}
					} else {
						this.$apply(fn);
					}
				};

				// draw Google map
				GoogleMap.init( 'alertsMap' );
				// Get data and draw markers				
				GoogleMapAlertsAdapter.getAlerts({
					success: function( data ) {
						// store cities object in scope
						$scope.dbData.data.map.cities = data.iyf;
						$scope.dbData.data.mapKPI = data.mapKPI;

						// call layover class
						GoogleMapD3Layover.drawMarkers({
							map: GoogleMap.getMap(),
							data: data.markersData,
							maxTotal: data.maxTotal,
							success: function( marker ) {
								$scope.viewViolationsDetail( marker.value.city );
							}
						});
					}
				});

			// private
			// - - - - - - - - - - - - - - - - - - - - - - -
				
				
				// listeners
				// - - - - - - - - - - - - - - - - - - -
				$scope.$on('$viewContentLoaded', function(){
					// if( appModel.getLocalCache().home !== null ) {
					// 	$scope.dbData = appModel.getLocalCache();
					// }
				});

				// cleanup before exiting page
	            //- - - - - - - - - - - - - - - - - - - - - 
	            $scope.$on("$locationChangeStart", function(event) {
	            	appModel.setLocalCache( 'home', $scope.dbData );
	            	$log.info(appModel.getLocalCache());
	            });
			}
		]);					
})(angular);