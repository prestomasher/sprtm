/**
 * Data adapter for map Violations visualization
 * plugin for translating data for violations
 * @author Jorge.Carmona@softwareag.com
 */
(function(ng) {
	'use strict';
	
	ng.module('MyApp').

	factory('ViolationsDetailAdapter', [
		
		'$filter',
		function($filter) {

			var getViolationsData = function( response ) {
				var iyf = {};
				
				var ds = new Miso.Dataset({
						data : ( angular.isArray( response['e:DataTable']['e:Entry'] ) ) ? response['e:DataTable']['e:Entry'] : [ response['e:DataTable']['e:Entry'] ]
					}).

					fetch({
						success : function() {
							// builds translation object for its client: (GoogleMapD3Layover) provider
							this.each(function( row ) {			
								// Build datamodel for IYF (In Yo'Face) widget
								// create an Object with city as the key to easily reference it.
								// - - - - - - - - - - - - - - - - - - - - - - - -
								iyf[ row.City ] = {
									city: row.City,
									groupItems: [{
										icon: 'fi-x',
										value: row.Alert,
										color: 'status-icon-alert',
										type: 'alert',
										city: row.City,
										stats: '<span class="alert">Alerts</span> severity violations are ' +  '<span class="accent-highlight">'+
													$filter('number')( (row.Alert / row.Total) * 100, 0) + '%</span> of the total for this city.'
									},{
										icon: 'fi-alert',
										value: row.Warning,
										color: 'status-icon-warning',
										type: 'warning',
										city: row.City,
										stats: '<span class="warning">Warning</span> severity violations are  ' + '<span class="accent-highlight">'+
													$filter('number')( (row.Warning / row.Total) * 100, 0) + '%</span> of the total for this city'
									},{
										icon: 'fi-check',
										value: row.Normal,
										color: 'status-icon-success',
										type: 'normal',
										city: row.City,
										stats: '<span class="normal">Normal</span> severity violations are ' + '<span class="accent-highlight">'+
													$filter('number')( (row.Normal / row.Total) * 100, 0) + '%</span> of the total for this city'
									}]
								};
							});
						}
					});

				return iyf;
			};

			return {
				getViolationsData : getViolationsData
			};
		}
	]);
})(angular);