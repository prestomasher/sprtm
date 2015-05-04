/**
 * Data adapter for map KPI visualization
 * plugin for translating data for map KPI
 * @author Jorge.Carmona@softwareag.com
 */
(function(ng) {
	'use strict';
	
	ng.module('MyApp').

	factory('CitiesAdapter', [
		
		'$filter',
		function($filter) {

			var getMapKpiData = function( response ) {
				var normalizedData = [],
					maxAlert = 0,
					mapKPI = [],
					majorHubs = [],
					topCities = [];
				
				var ds = new Miso.Dataset({
						data : ( angular.isArray( response['e:DataTable']['e:Entry'] ) ) ? response['e:DataTable']['e:Entry'] : [ response['e:DataTable']['e:Entry'] ]
					}).

					fetch({
						success : function() {
							// Build mapKPI data array wih two Objects.
							// First Object (Major Hubs: London, Tokyo & N.Y. sorted by highest alerts)
							// Second Object (Top 3 Cities: Cities with highest alerts not counting Major Hubs)
							// - - - - - - - - - - - - - - - - - - - - - - - -									
							// get highest alert (max) from data
							maxAlert = this.max( 'Alert' );

							this.where({
								rows: function(row) {
									if(row.City === 'London' || row.City === 'NJ' || row.City === 'Tokyo') {
										majorHubs.push({
											icon: 'fi-marker',
											name: row.City,
											value: row.Alert,
											colorCss: 'alert-bar',
											percent: row.Alert / maxAlert * 100
										});
									} else {
										topCities.push({
											icon: 'fi-marker',
											name: row.City,
											value: row.Alert,
											colorCss: 'alert-bar',
											percent: row.Alert / maxAlert * 100
										});
									}
								}
							});								
							// sort arrays
							majorHubs.sort( function( rowA, rowB ) {									
								return rowB.value - rowA.value;
							});

							topCities.sort( function( rowA, rowB ) {									
								return rowB.value - rowA.value;
							});

							mapKPI.push({
								grpTitle: 'Major Hubs',
								grpData: majorHubs
							},{
								grpTitle: 'Top 3 Cities',
								grpData: topCities.slice( 0, 3 )
							});							
						}
					});

				return mapKPI;
			};

			return {
				getMapKpiData : getMapKpiData
			};
		}
	]);
})(angular);