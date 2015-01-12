'use strict';

/**
 * @ngdoc function
 * @name yizhifuApp.controller:InfoUserListCtrl
 * @description
 * # InfoUserListCtrl
 * Controller of the yizhifuApp
 */
angular.module('yizhifuApp')
	.controller('InfoUserListCtrl', function($scope, $filter, yService) {

		$scope.config = {
			itemsPerPage: 20
		}

		$scope.people = []
		$scope.filtedPeopleList = []

		_getList()






		$scope.updateFilterPeopleList = function() {
			$scope.filtedPeopleList = $filter("byKeyMatch")("username", $scope.usernameQuery, $scope.people)
		}

		$scope.modify = function(id) {
			console.log("modify: " + id)
		}

		$scope.remove = function(user) {
			if (window.confirm("确定删除用户: '" + user.nickname + "' 吗？")) {
				yService.userCRUD({
					action: "delete",
					username: user.username
				}).then(function(){
					_getList()
				})
			}
		}

		$scope.resetPsw = function(id) {
			console.log("resetPsw: " + id + " success")
		}

		function _getList() {
			yService.getUserList().then(function(data) {
				if (data.data.result == 0) {
					$scope.people = data.data.users
					$scope.filtedPeopleList = $scope.people
				}
			})
		}



	});