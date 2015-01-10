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

			if (!$scope.username || !$scope.password) {
				alert("用户名或密码不为空！")
				return
			}

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