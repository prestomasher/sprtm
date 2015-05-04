/**
 * Datamodel that contains shared values for the application
 * @author  Jorge.Carmona@softwareag.com
 */
(function(ng) {
	angular.module('MyApp').

		service('appModel', [

			function(){
			// private
			
				// This object should save state for each page.
				var localDataCache = {
					// home page
					home: null
				};

				var dictionary = {
					login  : 'sign in',
					logout : 'Sign Out',

					// login
					loginCaption    : '',
					loginSubcaption : '',
					user            : 'Enter username',
					pass            : 'Enter password',					

					noData : 'data not available',

					// errors
					badCredentials       : 'Invalid username or password',
					serverError          : 'Error: check server connection',
					serverErrorReported  : 'Error reported from server: ',
					checkConnection      : 'Check server connection or IP in ConfigService.js',
					tryAuthenticating    : 'Try authenticating again.',
					appAuthError         : 'Application authentication failed. Error: ',

					//Filters
					filters      : 'options',
					noOptions    : 'no options available',

					// breadcrumbs & hea menu titles
					bcHome: 'Violations',
					bcScreen2: 'Twitter',

					// titles
					homeTitle : 'Realtime Data Governance',
					homeSubtitle : 'VIOLATIONS ANALYTICS CAPTURED IN VARONIS',
					homeIcon: 'fi-alert',
					socialTitle: 'Social',
					socialSubtitle: 'Twitter',
					socialIcon: 'fi-social-twitter',

					// user
					profileEdit: 'Edit Profile',
					profileSettings: 'Account Settings',

				// Home page
					// Map
					mapTitle: 'Realtime Data Violations by City',
					mapSubtitle: '* Click the SEVERITY legend to toggle visibility of the data.', //''
					mapStatsTitle: 'Cities to Watch',
					mapStatsSubtitle: 'Values relative to city with most alerts.',
					mapStatsTitle1: 'Major Hubs',
					mapStatsTitle2: 'Top 3 Cities',
					mapLegendTitle: 'SEVERITY',
					mapLegendSeries1: 'Normal',
					mapLegendSeries2: 'Warning',
					mapLegendSeries3: 'Alert',

					// Big stats
					bigStatsTitle: 'Violations Detail',
					bigStatsSubtitle: 'by City & Severity',
					bigStatsFooterText: 'Currently Viewing: ',

					// Home page grid
					homeGridTitle: 'Violation Alerts Detail',
					homeGridSubtitle: 'alerts with severity of ',
					gridCol1: 'ID',
					gridCol2: 'City',
					gridCol3: 'Group',
					gridCol4: 'Region',
					gridCol5: 'Server',
					gridCol6: 'User',
				};

			// public
				// returns application state object
				var getLocalCache = function() {
					return localDataCache;
				};
				/**
				 * sets state data for passed page
				 * @param {String} page Name for each page controller. (Same name as folder in app/components/{folderName})
				 * @param {JSON} data object with metadata and data declared in each page controller
				 */
				var setLocalCache = function( page, data ) {
					localDataCache[page] = data;
				};

				return {
					getLocalCache  : getLocalCache,
					setLocalCache  : setLocalCache,
					dictionary     : dictionary
				};
		}]);
		
})(angular);