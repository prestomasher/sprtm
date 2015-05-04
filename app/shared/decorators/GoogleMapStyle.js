/**
 * Google Map styles provider 
 * Adds styles to a google map 
 * @author Jorge.Carmona@softwareag.com
 */
(function(ng) {
	'use strict';
	
	ng.module('MyApp').

	provider('GoogleMapStyle', function() {
		
		/**
		 * Map properties shared by all themes
		 * @type {Array}
		 */
		var _mapProps = [{
            "featureType": "poi",
            "stylers": [
              { "saturation": -74 },
              { "visibility": "off" }
            ]
        },{
            "elementType": "labels",
            "stylers": [
              { "visibility": "off" }
            ]
        },{
            "featureType": "road",
            "stylers": [
              { "visibility": "off" }
            ]
        },{
            "featureType": "transit",
            "stylers": [
              { "visibility": "off" }
            ]
        },{
            "featureType": "landscape.man_made",
            "stylers": [
              { "visibility": "off" }
            ]
        }];

        /**
         * Returns dark map style props
         * @return {Array} array of map props
         */
		var _getDarkTheme = function() {
			var mapColors = [{
                "featureType": "water",
                "stylers": [
                  { "color": "#292b32" },
                  { "visibility": "simplified" }
                ]
            },{
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                  { "color": "#31323a" },
                  { "visibility": "simplified" }
                ]
            }];

            // concatenate both arrays before returning.
            return mapColors.concat( _mapProps );
		};

		/**
		 * Returns Google map theme
		 * @param  {String} style map style
		 * @return {Array}       array of Google map object properties
		 */
		var _getTheme = function( style ) {
			var theme = null;

			if( style === 'DarkTheme' ) {
				theme = _getDarkTheme();
			}

			return theme;
		};

		/**
		 * returns a Google map style
		 * @param  {String} style the style of the map. You can choose from DarkTheme.
		 * @param  {Object} map   instance of a Google map
		 */
		this.getMapStyle = function( style, map ) {
			var themedMapOptions = { map: map, name: 'maptheme' };
			var normalMapOptions = { map: map, name: 'default' };

			var darkStyledMapType = new google.maps.StyledMapType( _getTheme( style ), themedMapOptions );
				map.mapTypes.set( 'maptheme', darkStyledMapType );
				map.setMapTypeId( 'maptheme' );

			var defaultStyledMapType = new google.maps.StyledMapType( [{}], normalMapOptions );
				map.mapTypes.set( 'default', defaultStyledMapType );
			};

		this.$get = function() { 
			return {};
    	};
    
	});
})(angular);