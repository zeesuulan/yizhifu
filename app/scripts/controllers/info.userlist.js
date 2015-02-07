'use strict';

/**
 * @ngdoc function
 * @name yizhifuApp.controller:InfoUserListCtrl
 * @description
 * # InfoUserListCtrl
 * Controller of the yizhifuApp
 */
angular.module('yizhifuApp')
	.controller('InfoUserListCtrl', function($scope, $rootScope, $filter, yService) {

		$scope.config = {
			itemsPerPage: $rootScope.perPage
		}

		$scope.maxPage = 0
		$scope.currentPage = 1
		$scope.filtedPeopleList = []
		$scope.modifyItem = {}
		$scope.addItem = {}
		$scope.tableId = 'userlist'

		//初始化获取用户列表
		// $rootScope.$on("$profileReady", function() {
			_getList()
		// })

		//===========修改用户信息
		$scope.modify = function(item) {
			$scope.modifyItem = {
				nickname: item.nickname,
				username: item.username,
				userID: item.userId
			}
		}

		$scope.saveModify = function() {

			yService.userChangeNickname({
				userid: $scope.modifyItem.userID,
				nickname: $scope.modifyItem.nickname
			}).then(function(data) {
				if (data.data.result == 0) {
					$('#modifyModal').modal('hide')
					alert("修改成功！")
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
			if(!$scope.addItem.username){
				alert('请填写用户名')
				return
			}
			if(!$scope.addItem.nickname){
				alert('请填写用户姓名')
				return
			}
			if(!$scope.addItem.password) {
				alert('密码长度需6位以上')
				return
			}
			if(!$scope.addItem.role) {
				alert('请选择用户角色')
				return
			}

			yService.userCreate({
				username: $scope.addItem.username,
				password: $scope.addItem.password,
				nickname: $scope.addItem.nickname,
				province: $scope.addItem.province,
				role: $scope.addItem.role
			}).then(function(data) {
				if (data.data.result == 0) {
					$('#addModal').modal('hide')
					alert("添加成功！")
					_getList()
					$scope.addItem = {}
				} else {
					alert(ERR_MSG[data.data.result])
				}
			})
		}


		//===========重置用户密码
		$scope.resetPsw = function(id) {
			yService.userResetPassword({
				userid: id
			}).then(function(data) {
				if (data.data.result == 0) {
					alert("密码重置成功！")
				} else {
					alert(ERR_MSG[data.data.result])
				}
			})
		}

		//===========获取用户列表
		function _getList() {

			yService.getUserList({
				page: $scope.currentPage,
				perpage: $rootScope.perPage,
				username: $scope.usernameQuery,
				role: $scope.roleQuery
			}).then(function(data) {
				if (data.data.result == 0) {
					//如果当前分页没有数据
					if (data.data.users.length == 0) {
						//如果当前分页不为第一页
						if ($scope.currentPage > 1) {
							//设置当前分页为最大页数，默认为1
							$scope.currentPage = data.data.pages || 1
								//更新列表
							_getList()
						} else {
							//如果当前分页为第一页，则什么都不做
							$scope.currentPage = 1
							$scope.maxPage = data.data.pages
							$scope.filtedPeopleList = []
							return
						}
					} else {
						$scope.maxPage = data.data.pages
						$scope.filtedPeopleList = data.data.users
					}
				}
			})
		}

		//===========监听值变化
		$scope.$watch('usernameQuery', function() {
			_getList()
		})

		$scope.$watch('roleQuery', function() {
			_getList()
		})


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