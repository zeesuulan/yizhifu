'use strict';

/**
 * @ngdoc directive
 * @name yizhifuApp.directive:ySubnav
 * @description
 * # ySubnav
 */

angular.module('yizhifuApp')
	.directive('ySubnav', function() {
		return {
			templateUrl: 'views/part/subnav.html',
			restrict: 'A',
			replace: true,
			link: function(scope, element, attrs) {

				scope.datetime = new Date()
			}
		};
	});