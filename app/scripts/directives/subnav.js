'use strict';

/**
 * @ngdoc directive
 * @name yizhifuApp.directive:ySubnav
 * @description
 * # ySubnav
 */

angular.module('yizhifuApp')
	.directive('ySubnav', function($filter) {
		return {
			templateUrl: 'views/part/subnav.html',
			restrict: 'A',
			replace: true,
			scope: {
				provinceId: "=",
				profile: "=",
				pList: "="
			},
			link: function(scope, element, attrs) {

				scope.datetime = new Date()
				scope.province = scope.provinceId
				scope.provinceName = ''

				//当前用户选择了什么省份
				scope.$watch('province', function(oldv, news) {
					if (scope.province && scope.province != scope.provinceId) {
						scope.$emit("provinceChanged", scope.province)
					}
				})

				scope.$watch('pList', function(oldv, news){
					scope.provinceName = $filter('province')()
				})
			}
		};
	});