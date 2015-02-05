'use strict';

angular.module('yizhifuApp')
	.controller('InfoSettlementDetailCtrl', function($scope, $rootScope, $filter, $state, $stateParams, yService) {

		$scope.config = {
			itemsPerPage:  50
		}
		$scope.currentPage = 1
		$scope.tableId = 'settlmentDetials'

		$scope.dpconfig_end = {
			dropdownSelector: '.my-toggle-select-start',
			startView: 'month',
			minView: 'minute'
		}

		$scope.dpconfig_end.dropdownSelector = '.my-toggle-select-end'
		$scope.merchantDetailList = []
		$scope.endDate = ''

		$scope.attrDesc = {
			"1" : "普通商品",
			"2" : "促销专区",
			"3" : "自营商品"
		}


		_getMerchantDetails()


		$scope.onTimeSet = function(newDate, oldDate) {
			if (newDate != oldDate) {
				$scope.endDate = $filter('date')(newDate, 'yyyyMMdd')
				_getMerchantDetails()
			}
		}

		$scope.clearEndDate = function(){
			$scope.data.enddate = ""
			$scope.endDate = ""
			_getMerchantDetails()
		}

		$scope.settle = function(){
			yService.settle({
				shopId: $stateParams.merchantid,
				password: $scope.passwd.password,
				number: $scope.number,
				firstId: $rootScope.firstId
			}).then(function(data){
				if(data.data.result == 0) {
					alert('结算成功！')
					$("#passwdModal").modal('hide')
					$scope.passwd.password = ""
					_getMerchantDetails()
				}else{
                    alert(ERR_MSG[data.data.result])
				}
			})
		}

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
						if($scope.currentPage == 1) {
							$rootScope.firstId = data.data.orders[0].orderId
						}
						$scope.maxPage = data.data.pages
						$scope.merchantDetailList = data.data.orders
						$scope.number = data.data.number
						$scope.startdate = data.data.orders[0].consumeTime
					}
				}else{
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