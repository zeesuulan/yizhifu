'use strict';

/**
 * @ngdoc function
 * @name yizhifuApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yizhifuApp
 */
angular.module('yizhifuApp')
	.controller('LoginCtrl', function($scope, $location, yService) {

		$scope.login = function() {
			yService.login({
				username: $scope.username,
				password: $scope.password
			}).then(function(data) {
				if (data.data.result == 0) {
					$location.url("/info")
				} else {
					alert(ERR_MSG[data.data.result])
				}
			})
		}

	});