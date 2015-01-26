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

				scope.provinceName = ''

				//当前用户选择了什么省份,很尴尬的用法
				scope.pidChange = function() {
					scope.$emit("provinceChanged", scope.pList[$('#p').val()].id)
				}

				scope.$watch('pList', function(oldv, news) {
					scope.provinceName = $filter('province')()
					scope.province = scope.provinceId
					
					$("#p option[value='" + scope.provinceId + "']").attr("selected", "selected")
				})
			}
		};
	});