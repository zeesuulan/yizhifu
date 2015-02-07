'use strict';

angular.module('yizhifuApp')
	.controller('InfoSettlementDetailCtrl', function($scope, $rootScope, $filter, $state, $stateParams, yService) {

		$scope.config = {
			itemsPerPage: 50
		}
		$scope.currentPage = 1
		$scope.tableId = 'settlmentDetials'

		$scope.dpconfig_end = {
			dropdownSelector: '.my-toggle-select-start',
			startView: 'month',
			minView: 'day'
		}

		$scope.dpconfig_end.dropdownSelector = '.my-toggle-select-end'
		$scope.merchantDetailList = []
		$scope.endDate = ''
		$scope.settleResult = ''
		$scope.attrDesc = {
			"0": "总金额",
			"1": "普通商品",
			"2": "促销专区",
			"3": "自营商品"
		}


		_getMerchantDetails()

		$scope.onTimeSet = function(newDate, oldDate) {
			if (newDate != oldDate) {

				var endDate = $filter('date')(newDate, 'yyyyMMdd'),
					format = 'YYYY-MM-DD HH:mm:ss'

				if (moment($scope.startdate, format).isBefore(moment(endDate, format)) &&  //起始时间早于结束时间
					moment(endDate, format).isBefore(moment())) { //起始时间早于现在
					$scope.endDate = endDate
					_getMerchantDetails()
				} else {
					alert('结束时间选择不正确！请重新选择！')
					$scope.clearEndDate(true)
				}
			}
		}

		$scope.clearEndDate = function(noRefresh) {
			$scope.data.enddate = ""
			$scope.endDate = ""
			if(!noRefresh){
				_getMerchantDetails()
			}
		}

		$scope.settle = function() {
			yService.settle({
				shopId: $stateParams.merchantid,
				password: $scope.passwd.password,
				number: $scope.number,
				firstId: $rootScope.firstId
			}).then(function(data) {
				if (data.data.result == 0) {
					$("#passwdModal").modal('hide')

					$scope.settleResult = data.data.summary
					$scope.excelDownload = data.data.excelUrl

					$("#detailModal").modal('show')
					$scope.passwd.password = ""
					_getMerchantDetails()
				} else {
					alert(ERR_MSG[data.data.result])
				}
			})
		}

		$("#detailModal").on('hide.bs.modal', function() {
			$scope.settleResult = ""
			$scope.excelDownload = ""
		})

		$scope.$on('$provinceUpdate', function() {
			$state.go('info.settlement')
		})


		function _getMerchantDetails() {
			yService.queryOrder({
				perpage: $scope.config.itemsPerPage,
				page: $scope.currentPage,
				shopId: $stateParams.merchantid,
				endDate: $scope.endDate
			}).then(function(data) {
				if (data.data.result == 0) {
					//如果当前分页没有数据
					if (data.data.orders.length == 0) {
						//如果当前分页不为第一页
						if ($scope.currentPage > 1) {
							//设置当前分页为最大页数，默认为1
							$scope.currentPage = data.data.pages || 1
								//更新列表
							_getMerchantDetails()
						} else {
							//如果当前分页为第一页，则什么都不做
							$scope.currentPage = 1
							$scope.maxPage = data.data.pages
							$scope.merchantDetailList = []
							return
						}
					} else {
						if ($scope.currentPage == 1) {
							$rootScope.firstId = data.data.orders[0].orderId
						}
						$scope.maxPage = data.data.pages
						$scope.merchantDetailList = data.data.orders
						$scope.number = data.data.number
						$scope.startdate = data.data.orders[0].consumeTime
					}
				} else {
					$scope.merchantDetailList = []
					alert(ERR_MSG[data.data.result])
				}
			})
		}

		//===========监听事件翻页事件
		$scope.$on($scope.tableId + "-first", function() {
			$scope.currentPage = 1
			_getMerchantDetails()
		})

		$scope.$on($scope.tableId + "-end", function() {
			$scope.currentPage = $scope.maxPage
			_getMerchantDetails()
		})

		$scope.$on($scope.tableId + "-pre", function(evt, data) {
			$scope.currentPage = data
			_getMerchantDetails()
		})

		$scope.$on($scope.tableId + "-next", function(evt, data) {
			$scope.currentPage = data
			_getMerchantDetails()
		})

		$scope.$on($scope.tableId + "-go", function(evt, data) {
			$scope.currentPage = data
			_getMerchantDetails()
		})


	});