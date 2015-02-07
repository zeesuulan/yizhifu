'use strict';

angular.module('yizhifuApp')
	.controller('InfoLogqueryCtrl', function($scope, $rootScope, $timeout, $filter, yService) {

		$scope.config = {
			itemsPerPage: $rootScope.perPage
		}
		$scope.currentPage = 1
		$scope.tableId = 'log'
		$scope.logList = []
		$scope.dpconfig = {
			minView: 'day'
		}


		$scope.logQuery = {
			shopName: "",
			operatorId: "",
			startDateTime: "",
			endDateTime: ""
		}

		_getLogs()

		var snPromise = null

		$scope.$on('$provinceUpdate', function() {
			_getLogs()
		})

		// $scope.$watch('logQuery.shopName', function(oldVal, newVal) {
		// 	$timeout.cancel(snPromise)
		// 	snPromise = $timeout(function() {
		// 		if (oldVal != newVal) {
		// 			_getLogs()
		// 		}
		// 	}, 200)
		// })

		// $scope.$watch('logQuery.operatorId', function(oldVal, newVal) {
		// 	$timeout.cancel(snPromise)
		// 	snPromise = $timeout(function() {
		// 		if (oldVal != newVal) {
		// 			_getLogs()
		// 		}
		// 	}, 200)
		// })

		// $scope.$watch('logQuery.endDateTime', function() {
		// 	if ($scope.logQuery.startDateTime) {
		// 		_getLogs()
		// 	}
		// })

		$scope.query = function(){
			if(!$scope.logQuery.startDateTime || !$scope.logQuery.endDateTime) {
				alert("请选择起始时间和结束时间！")
				return
			}
			_getLogs()
		}

		function _getLogs() {
			yService.queryLog({
				perpage: $scope.config.itemsPerPage,
				page: $scope.currentPage,
				shopName: $scope.logQuery.shopName,
				operatorId: $scope.logQuery.operatorId,
				startDateTime: $filter('date')($scope.logQuery.startDateTime, 'yyyyMMdd'),
				endDateTime: $filter('date')($scope.logQuery.endDateTime, 'yyyyMMdd')
			}).then(function(data) {
				if (data.data.result == 0) {
					//如果当前分页没有数据
					if (data.data.logs.length == 0) {
						//如果当前分页不为第一页
						if ($scope.currentPage > 1) {
							//设置当前分页为最大页数，默认为1
							$scope.currentPage = data.data.pages || 1
								//更新列表
							_getLogs()
						} else {
							//如果当前分页为第一页，则什么都不做
							$scope.currentPage = 1
							$scope.maxPage = data.data.logs
							$scope.logList = []
							return
						}
					} else {
						$scope.maxPage = data.data.pages
						$scope.logList = data.data.logs
					}
				} else {
					alert(ERR_MSG[data.data.result])
				}
			})
		}

		//===========监听事件翻页事件
		$scope.$on($scope.tableId + "-first", function() {
			$scope.currentPage = 1
			_getLogs()
		})

		$scope.$on($scope.tableId + "-end", function() {
			$scope.currentPage = $scope.maxPage
			_getLogs()
		})

		$scope.$on($scope.tableId + "-pre", function(evt, data) {
			$scope.currentPage = data
			_getLogs()
		})

		$scope.$on($scope.tableId + "-next", function(evt, data) {
			$scope.currentPage = data
			_getLogs()
		})

		$scope.$on($scope.tableId + "-go", function(evt, data) {
			$scope.currentPage = data
			_getLogs()
		})
	});