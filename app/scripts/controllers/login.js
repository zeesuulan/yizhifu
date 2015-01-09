'use strict';

/**
 * @ngdoc function
 * @name yizhifuApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yizhifuApp
 */
angular.module('yizhifuApp')
	.controller('LoginCtrl', function($scope, $location) {
		$scope.login = function(){

			console.log($scope.username, $scope.password)


			$location.url("/info")
		}
	});