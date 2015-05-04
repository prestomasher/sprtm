/**
 * Google Map D3 Layover factory 
 * Adds D3 layover with clickable circles
 * @author Jorge.Carmona@softwareag.com
 */
(function(ng) {
	'use strict';
	
	ng.module('MyApp').

	factory('GoogleMapD3Layover', function(GoogleMap) {
    // As per the Google docs, you must implement three methods: onAdd(), draw(), and onRemove().
    
    // private
        var _map        = null,
            _overlay    = null,
            _layer      = null,
            _projection = null,
            _data       = null,
            _marker     = null,
            _maxTotal   = null,
            _callback   = null,
            _stuff = null;

        // transforms lat long to pixels
        var _transform = function( dataItem ) {
            var pixelCoord = _getPixelCoord( dataItem );
            
            return d3.select( this )
                .style("left", ( pixelCoord.x ) + "px")
                .style("top",  ( pixelCoord.y ) + "px");
        };

        var _getPixelCoord = function( d ) {    
            var geoCoord = new google.maps.LatLng(d.value.lat, d.value.lng);
            var pixelCoord = _projection.fromLatLngToDivPixel( geoCoord );

            return pixelCoord;
        };

        // returns circle style
        var _getMarkerStyle = function( d ) {
            var cls = 'green',
                severity = parseInt( d.value.normal ),
                severityType = 'normal';

            if( parseInt(d.value.warning) > severity ) {
                severity = parseInt( d.value.warning );
                severityType = "warning";
            } 
            if( parseInt(d.value.alert) > severity ) {
                severity = parseInt( d.value.alert );
                severityType = "alert";
            }
            
            if( severityType === 'warning' ) {
                cls = 'yellow';
            } else if( severityType === 'alert' ) {
                cls = 'red';
            }

            return cls;
        };

        // Used to create DOM objects and append them as children of the panes.
        var _onAdd = function() { 
            _layer = d3.select( this.getPanes().overlayMouseTarget).append("div").attr( "class", "map-assets" );
            _projection = this.getProjection();                
        };
        // Position elements created _onAdd
        var draw = function() {           
            // Draws container for shape
            _marker = _layer.selectAll( 'svg' )
                .data( d3.entries( _data ) )
                .each( _transform )
                .enter().append( 'svg:svg' )
                .each( _transform )
                .attr( 'width', function( d ) {
                    return getScalar( d ) * 2;
                })
                .attr( 'height', function( d ) {
                    return getScalar( d ) * 2;
                })
                .attr( 'class', 'marker' )
                .on('click', function(d) {   
                    _callback( d );
                });

        //     // add circles
            _marker.append( 'svg:circle' )
                .attr( 'r', function( d ) {
                    return getScalar( d );
                })
                .attr( 'class', _getMarkerStyle)
                .attr( 'cx', function( d ) {
                    return getScalar( d );
                })
                .attr( 'cy', function(d) {
                    return getScalar( d );
                });

        // Add a label.
            _marker.append( 'text' )
                .style( 'text-anchor', 'middle' )
                .attr( 'x', function( d ) {
                    return getScalar( d );
                })
                .attr( 'y', function( d ) {
                    return getScalar( d );
                })
                .text( function( d ) {  return d.value.total; } );
        };
        // To remove objects from the DOM
        var _onRemove = function() {};
		
    // public
        var drawMarkers = function( options ) {
            _map      = options.map;
            _data     = options.data;
            _maxTotal = options.maxTotal;
            _callback = options.success;

            _overlay  = new google.maps.OverlayView();

            // These have to be implemented according to GMaps docs
            _overlay.onAdd    = _onAdd;
            _overlay.draw     = draw;
            _overlay.onRemove = _onRemove;
            
            // Bind our overlay to the map…
            _overlay.setMap( _map );
        };

        var getScalar = function( d ) {
            var min = 15, max = 40;
            var scalar = min + ((parseInt( d.value.total ) / _maxTotal ) * ( max - min ));
          
            return scalar;
        };
        
        var toggleMarkersVisibility = function( className ) {
            if( $( 'circle.' + className ).parent().attr('class') === 'hide' ) {
                $( 'circle.' + className ).parent().attr( 'class', 'marker' );
            } else {
                $( 'circle.' + className ).parent().attr( 'class', 'hide' );
            }
        };

        return {
            getScalar: getScalar,
            drawMarkers : drawMarkers,
            draw : draw,
            toggleMarkersVisibility: toggleMarkersVisibility
        };
    
	});
})(angular);