'use strict';

/**
 * @ngdoc directive
 * @name yizhifuApp.directive:yHeader
 * @description
 * # yHeader
 */

angular.module('yizhifuApp')
	.directive('yHeader', function($state, yService) {
		return {
			templateUrl: 'views/part/header.html',
			restrict: 'A',
			replace: true,
			link: function(scope, element, attrs) {

				scope.reload = function() {
					$state.reload()
				}

				scope.back = function() {
					window.history.back()
					// $state.transitionTo(-1)
				}

				scope.forward = function() {
					window.history.forward()
				}

				scope.logout = function() {
					yService.logout().then(function(data) {
						if (data.data.result == 0) {
							$state.go("index")
						} else {
							alert(ERR_MSG[data.data.result])
						}
					})
				}
			}
		};
	});