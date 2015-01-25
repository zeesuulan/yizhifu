'use strict';

angular.module('yizhifuApp')
	.controller('InfoLedgerqueryCtrl', function($scope, $rootScope, yService) {

		$scope.config = {
			itemsPerPage: $rootScope.perPage
		}
		$scope.currentPage = 1
		$scope.tableId = 'ledger'
		$scope.ledgerQueryList = []


		_getList()

		$scope.$on('$provinceUpdate', function() {
			_getList()
		})

		function _getList() {
			yService.queryReport({
				perpage: $scope.config.itemsPerPage,
				page: $scope.currentPage
			}).then(function(data) {
				if (data.data.result == 0) {
					//如果当前分页没有数据
					if (data.data.reports.length == 0) {
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
							$scope.ledgerQueryList = []
							return
						}
					} else {
						$scope.maxPage = data.data.pages
						$scope.ledgerQueryList = data.data.reports
					}
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