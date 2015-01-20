'use strict';

/**
 * @ngdoc function
 * @name yizhifuApp.controller:InfoCtrl
 * @description
 * # InfoCtrl
 * Controller of the yizhifuApp
 */
angular.module('yizhifuApp')
	.controller('InfoCtrl', function($scope, yService) {

		$scope.$on('provinceChanged', function(evt, data) {
			//当前用户选择了什么省份
			yService.selectProvince({
				province: data
			}).then(function(data){
			    console.log(data)
			})
		})
	});