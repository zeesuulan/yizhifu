'use strict';

angular.module('yizhifuApp')
	.controller('InfoSettlementCtrl', function($scope, $rootScope, yService) {

		$scope.config = {
			itemsPerPage: $rootScope.perPage
		}
		$scope.currentPage = 1

		$scope.merchantQuery = {
			city: "",
			area: "",
			zone: "",
			shopName: "",
			firstType: "",
			secondType: ""
		}

		$scope.tableId = 'settlment'

		$scope.merchantList = []

		_getMerchanList()


		//筛选条件
		$scope.$watch('merchantQuery.shopName', function(oldVal, newVal) {
			if (oldVal != newVal) {
				_getMerchanList()
			}
		})

		$scope.$watch('merchantQuery.city', function(oldVal, newVal) {
			if (oldVal != newVal) {
				_getMerchanList()
			}
		})

		$scope.$watch('merchantQuery.area', function(oldVal, newVal) {
			if (oldVal != newVal) {
				_getMerchanList()
			}
		})

		$scope.$watch('merchantQuery.zone', function(oldVal, newVal) {
			if (oldVal != newVal) {
				_getMerchanList()
			}
		})

		$scope.$watch('merchantQuery.firstType', function(oldVal, newVal) {
			if (oldVal != newVal) {
				_getMerchanList()
			}
		})

		$scope.$watch('merchantQuery.secondType', function(oldVal, newVal) {
				if (oldVal != newVal) {
					_getMerchanList()
				}
			})
			//筛选条件
		function _getMerchanList() {
			yService.queryShop({
				city: $scope.merchantQuery.city,
				area: $scope.merchantQuery.area,
				zone: $scope.merchantQuery.zone,
				shopName: $scope.merchantQuery.shopName,
				firstType: $scope.merchantQuery.firstType,
				secondType: $scope.merchantQuery.secondType,
				perpage: $scope.config.itemsPerPage,
				page: $scope.currentPage
			}).then(function(data) {
				if (data.data.result == 0) {
					//如果当前分页没有数据
					if (data.data.shops.length == 0) {
						//如果当前分页不为第一页
						if ($scope.currentPage > 1) {
							//设置当前分页为最大页数，默认为1
							$scope.currentPage = data.data.pages || 1
								//更新列表
							_getMerchanList()
						} else {
							//如果当前分页为第一页，则什么都不做
							$scope.currentPage = 1
							$scope.maxPage = data.data.pages
							$scope.merchantList = []
							return
						}
					} else {
						$scope.maxPage = data.data.pages
						$scope.merchantList = data.data.shops
						console.log($scope.merchantList)
					}
				}
			})
		}

		//===========监听事件翻页事件
		$scope.$on($scope.tableId + "-first", function() {
			$scope.currentPage = 1
			_getMerchanList()
		})

		$scope.$on($scope.tableId + "-end", function() {
			$scope.currentPage = $scope.maxPage
			_getMerchanList()
		})

		$scope.$on($scope.tableId + "-pre", function(evt, data) {
			$scope.currentPage = data
			_getMerchanList()
		})

		$scope.$on($scope.tableId + "-next", function(evt, data) {
			$scope.currentPage = data
			_getMerchanList()
		})

		$scope.$on($scope.tableId + "-go", function(evt, data) {
			$scope.currentPage = data
			_getMerchanList()
		})


	});