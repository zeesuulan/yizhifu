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

		$scope.maxPage = 0
		$scope.currentPage = 1
		$scope.people = []
		$scope.filtedPeopleList = []
		$scope.modifyItem = {}
		$scope.addItem = {}
		$scope.tableId = 'userlist'

		//初始化获取用户列表
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
				yService.userDelete({
					userid: user.userId
				}).then(function(data) {
					if (data.data.result == 0) {
						alert("删除成功！")
						_getList()
					} else {
						alert(ERR_MSG[data.data.result])
					}
				})
			}
		}

		//===========新增用户
		$scope.clearAdd = function() {
			$scope.addItem = {}
		}

		$scope.saveAdd = function() {
			yService.userCreate({
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
			yService.getUserList({
				page: $scope.currentPage,
				perpage: $scope.config.itemsPerPage
			}).then(function(data) {
				if (data.data.result == 0) {
					$scope.maxPage = data.data.pages
					$scope.people = data.data.users
					$scope.filtedPeopleList = $scope.people
				}
			})
		}

		//===========监听事件翻页事件
		$scope.$on($scope.tableId + "-first", function() {
			$scope.currentPage = 1
			_getList()
		})

		$scope.$on($scope.tableId + "-end", function() {
			$scope.currentPage = $scope.maxPage
			_getList()
		})

		$scope.$on($scope.tableId + "-pre", function(evt, data) {
			$scope.currentPage = data
			_getList()
		})

		$scope.$on($scope.tableId + "-next", function(evt, data) {
			$scope.currentPage = data
			_getList()
		})

		$scope.$on($scope.tableId + "-go", function(evt, data) {
			$scope.currentPage = data
			_getList()
		})

	});