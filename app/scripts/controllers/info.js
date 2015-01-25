'use strict';

/**
 * @ngdoc function
 * @name yizhifuApp.controller:InfoCtrl
 * @description
 * # InfoCtrl
 * Controller of the yizhifuApp
 */
angular.module('yizhifuApp')
	.controller('InfoCtrl', function($scope, $rootScope, $cookieStore, yService) {

		$scope.provinceId = $cookieStore.get('provinceId')
		
		$scope.$on('provinceChanged', function(evt, data) {
			$scope.provinceId = data
				//当前用户选择了什么省份
			$cookieStore.put('provinceId', parseInt(data))

			if (data) {
				yService.selectProvince({
					province: data
				}).then(function(data) {
					$scope.$broadcast('$provinceUpdate')
				})
			}
		})
	});