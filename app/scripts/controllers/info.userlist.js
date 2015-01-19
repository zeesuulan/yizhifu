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
		$scope.modifyItem = {}
		$scope.addItem = {}

		_getList()



		$scope.updateFilterPeopleList = function() {
			$scope.filtedPeopleList = $filter("byKeyMatch")("username", $scope.usernameQuery, $scope.people)
		}

		//===========修改用户信息
		$scope.modify = function(item) {
			$scope.modifyItem = {
				nickname: item.nickname,
				username: item.username,
				userID: item.userId
			}
		}

		$scope.saveModify = function() {

			yService.userCRUD({
				action: "update",
				userid: $scope.modifyItem.userID,
				nickname: $scope.modifyItem.nickname
			}).then(function(data) {
				if (data.data.result == 0) {
					$('#modifyModal').modal('hide')
					_getList()
				} else {
					alert(ERR_MSG[data.data.result])
				}
			})
		}

		//===========移除用户
		$scope.remove = function(user) {
			if (window.confirm("确定删除用户: '" + user.nickname + "' 吗？")) {
				yService.userCRUD({
					action: "delete",
					username: user.username
				}).then(function() {
					_getList()
				})
			}
		}

		//===========新增用户
		$scope.clearAdd = function() {
			$scope.addItem = {}
		}

		$scope.saveAdd = function() {
			console.log($scope.addItem)
			yService.userCRUD({
				action: "create",
				username: $scope.addItem.username,
				password: $scope.addItem.password,
				nickname: $scope.addItem.nickname,
				province: $scope.addItem.province,
				role: $scope.addItem.role
			}).then(function(data) {
				if (data.data.result == 0) {
					$('#addModal').modal('hide')
					_getList()
					$scope.addItem = {}
				} else {
					alert(ERR_MSG[data.data.result])
				}
			})
		}


		//===========重置用户密码
		$scope.resetPsw = function(id) {
			console.log("resetPsw: " + id + " success")
		}


		//===========获取用户列表
		function _getList() {
			yService.getUserList().then(function(data) {
				if (data.data.result == 0) {
					$scope.people = data.data.users
					$scope.filtedPeopleList = $scope.people
				}
			})
		}

	});