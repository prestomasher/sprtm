/**
 * Google Map Factory 
 * Draws a Google map with default markers. Use decorators to change styles or draw custom markers
 * @author Jorge.Carmona@softwareag.com
 */
(function(ng) {
	'use strict';

	ng.module('MyApp').

	factory('GoogleMap', [
		
		function() {
		// private
		// - - - - - - - - - - - - - - -	
			var _map = null,
				_bounds = null,
				_infowindow = null,
				_zoom = 5,
				_lat = 43.897892,
				_lng = -96.537109;

			// returns instance of Google map
			var getMap = function() {
				return _map;
			};
			// sets Zoom
			var setZoom = function( zoomLevel ) {
				_zoom = zoomLevel;
			};
			// set map center lat
			var setCenterLat = function( centerLat ) {
				_lat = centerLat;
			};
			// set map center lng
			var setCenterLng = function( centerLng ) {
				_lng = centerLng;
			};

			/**
             * draws marker
             * @param {JSON} dataItem data object
             */
            var _addMarker = function( dataItem ) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng( _lat, _lng ),
                    map: _map
                });

                _bounds.extend(new google.maps.LatLng( dataItem.lat, dataItem.lng ));

                // google.maps.event.addListener(marker, 'click', function() {
                //     $rootScope.$broadcast( 'mapMarkerClicked', dataItem);
                // });
            };

		// public
		// - - - - - - - - - - - - - - -	

			// draws Google map to passed container
			var draw = function( container ) {
				// center is set to USA. 
				// Use 48.6908333333, 9.14055555556 for Europe				
                var myLatlng = new google.maps.LatLng( _lat, _lng );
                
                var mapOptions = {
                    zoom: _zoom,
                    center: myLatlng,
                    scrollwheel: false,	// disables zoom when using mouse scroll
                    panControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    },
                    zoomControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.LARGE
                    }
                };

                _map        = new google.maps.Map(document.getElementById( container ), mapOptions);
                _bounds     = new google.maps.LatLngBounds();
                _infowindow = new google.maps.InfoWindow();
            };

            /**
             * Draws basic Google map markers.
             * @param  {Array} markersData Array of JSON objects 
             * with the following markup:
             *     [{ lat: 48.6908333333, lng: 9.14055555556 }, {}...]
             */
            var drawMarkers = function( markersData ) {
            	var ds = new Miso.Dataset({
					data : markersData
				}).fetch({
					success : function() {
						this.each(function(row) {
							_addMarker( row );
						});
					}
				});

            	_map.fitBounds(_bounds); 
            };

			return {
				getMap       : getMap,
				setZoom      : setZoom,
				draw         : draw,
				setCenterLat : setCenterLat,
				setCenterLng : setCenterLng,
				drawMarkers  : drawMarkers
			};
		}
	]);
})(angular);