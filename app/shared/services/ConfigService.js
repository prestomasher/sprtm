/**
 * App configuration module
 * This module holds global app configuration and labels services
 */
(function(ng) {
	angular.
		module('MyApp').

		// CONSTANTS for application. Cannot be intercepted by Decorators
		constant('APP_CONFIG', {
			PRESTO_SERVER: (function() {
				var hostname = window.location.hostname,
					port     = (window.location.port !== '') ? ':' + window.location.port : '',
					// server   = 'http://' + hostname + port;	//Use this when running from remote server
					server = 'http://localhost:7000';	//Use this when running from local server

				return server;
			}()),

			COMPANY_NAME: '',
			APP_TITLE: 'Realtime Data Governance',
			APP_ICONS: {
				logo   : 'Standard_Poors.jpg'
			},

			// Theme color variables. Used in widgets where colors are embedded in javascript vs css
			PRIMARY_COLOR     : "#1a2641",		
			SECONDARY_COLOR   : "#292e46",		
			LANDSCAPE         : "#000000",			
			ANCHOR_FONT_COLOR : "#88c4e8",			
			SUCCESS_COLOR     : "#aae200",		
			WARNING_COLOR     : "#e6d549",		
			ALERT_COLOR       : "#e22020",			
			SMOKE             : "#EEEEEE"				
		});
})(angular);