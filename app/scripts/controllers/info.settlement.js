'use strict';

angular.module('yizhifuApp')
	.controller('InfoSettlementCtrl', function($scope, $rootScope, $timeout, yService) {

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
		$scope.pDetailAreas = []
		$scope.pDetailZones = []
		$scope.pDetailSecondType = []
		$scope.merchantList = []

		_getMerchanList()
		_getProvinceDetail()

		$scope.$on('$provinceUpdate', function() {
			_getMerchanList()
			_getProvinceDetail()
		})

		//select联动
		$scope.cityChange = function() {
			$scope.merchantQuery.area = ""

			var index = 0
			angular.forEach($scope.pDetail.cities, function(v, k) {
				if ($scope.pDetail.cities[index].cityId == $scope.merchantQuery.city) {
					$scope.pDetailAreas = $scope.pDetail.cities[index].areas
				}
				++index
			})
			$scope.pDetailZones = []
		}

		$scope.areaChange = function() {
			$scope.merchantQuery.zone = ""

			var index = 0
			angular.forEach($scope.pDetailAreas, function(v, k) {
				if ($scope.pDetailAreas[index].areaId == $scope.merchantQuery.area) {
					$scope.pDetailZones = $scope.pDetailAreas[index].zones
				}
				++index
			})
		}

		$scope.firstTypeChange = function() {
			$scope.merchantQuery.secondType = ""

			var index = 0
			angular.forEach($scope.pDetail.firstTypes, function(v, k) {
				if ($scope.pDetail.firstTypes[index].firstTypeId == $scope.merchantQuery.firstType) {
					$scope.pDetailSecondType = $scope.pDetail.firstTypes[index].secondTypes
				}
				++index
			})
		}


		var snPromise = null

		//筛选条件
		$scope.$watch('merchantQuery.shopName', function(oldVal, newVal) {
			$timeout.cancel(snPromise)
			snPromise = $timeout(function() {
				if (oldVal != newVal) {
					_getMerchanList()
				}
			}, 200)
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
					}
				}
			})
		}

		function _getProvinceDetail() {
			yService.provinceDetail().then(function(data) {
				if (data.status == 200) {
					$scope.pDetail = data.data
				} else {
					alert(ERR_MSG[data.data.result])
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