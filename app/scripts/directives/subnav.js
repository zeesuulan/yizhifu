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

				//当前用户选择了什么省份
				scope.$watch('province', function() {
					if (scope.province) {
						scope.$emit("provinceChanged", scope.province)
					}
				})

			}
		};
	});