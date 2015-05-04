/**
 * Layout Helper 
 * Helper to controller for setting data to layout not set by each page in the content panel. 
 * @author Jorge.Carmona@softwareag.com
 */
(function(ng) {
	'use strict';
	
	ng.module('MyApp').

	service('LayoutHelper', [
		'appModel',
		function( appModel ) {
			var labels = appModel.dictionary;

			/**
			 * sets data for elements in the layout that are not set by each page
			 * @param {Object} scope LayoutController $scope
			 * @param {String} page current page
			 */
			var setLayoutMetadata = function(scope, page) {
				var layout = scope.dbData.metadata.layout;
				
				layout.currentBreadCrumb = page;
				switch( page ) {
					case 'Social' : 
						layout.pageTitle = labels.socialTitle;
						layout.pageDescription = labels.socialSubtitle;
						layout.pageIcon = labels.socialIcon;
					break;

					default: 
						layout.pageTitle = labels.homeTitle;
						layout.pageDescription = labels.homeSubtitle;
						layout.pageIcon = labels.homeIcon;
				}
			};

			return {
				setLayoutMetadata : setLayoutMetadata
			};
		}
	]);
})(angular);