'use strict';

angular.module('yizhifuApp')
	.controller('InfoLogqueryCtrl', function($scope, $rootScope, yService) {

		$scope.config = {
			itemsPerPage: $rootScope.perPage
		}
		$scope.currentPage = 1
		$scope.tableId = 'log'
		$scope.logList = []

		_getLogs()

		function _getLogs() {
			yService.queryLog({
				perpage: $scope.config.itemsPerPage,
				page: $scope.currentPage
			}).then(function(data) {
				if (data.data.result == 0) {
					//如果当前分页没有数据
					if (data.data.logs.length == 0) {
						//如果当前分页不为第一页
						if ($scope.currentPage > 1) {
							//设置当前分页为最大页数，默认为1
							$scope.currentPage = data.data.pages || 1
								//更新列表
							_getList()
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
				}
			})
		}
	});