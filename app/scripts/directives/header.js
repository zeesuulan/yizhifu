'use strict';

/**
 * @ngdoc directive
 * @name yizhifuApp.directive:yHeader
 * @description
 * # yHeader
 */

angular.module('yizhifuApp')
	.directive('yHeader', function() {
		return {
			templateUrl: 'views/part/header.html',
			restrict: 'A',
			replace: true,
			link: function(scope, element, attrs) {

				scope.reload = function() {
					window.location.reload()
				}

				scope.back = function() {
					window.history.back()
				}

				scope.forward = function() {
					window.history.forward()
				}

				scope.logout = function() {
					console.log('sevice logout')
				}
			}
		};
	});