'use strict';

/**
 * @ngdoc function
 * @name yizhifuApp.controller:InfoCtrl
 * @description
 * # InfoCtrl
 * Controller of the yizhifuApp
 */
angular.module('yizhifuApp')
	.controller('InfoCtrl', function($scope, $rootScope, yService) {

		$scope.provinceId = $rootScope.provinceId

		$scope.$on('provinceChanged', function(evt, data) {
			$scope.provinceId = data
				//当前用户选择了什么省份
			if (data) {
				yService.selectProvince({
					province: data
				}).then(function(data) {
					$rootScope.provinceId = $scope.provinceId 
					$scope.$broadcast('$provinceUpdate')
				})
			}
		})
	});