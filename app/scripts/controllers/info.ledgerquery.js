'use strict';

angular.module('yizhifuApp')
	.controller('InfoLedgerqueryCtrl', function($scope, $rootScope, $filter, yService) {

		$scope.config = {
			itemsPerPage: $rootScope.perPage
		}
		$scope.currentPage = 1
		$scope.tableId = 'ledger'
		$scope.ledgerQueryList = []

		$scope.dpconfig = {
			minView: 'day'
		}


		_getList()

		$scope.$on('$provinceUpdate', function() {
			_getList()
		})

		$scope.toCreate = function() {
			if (!$scope.data || !$scope.data.startdate || !$scope.data.enddate) {
				alert("请选择要生成统计的起始日期和结束日期！")
				return
			}

			var startDate = $scope.data.startdate,
				endDate = $scope.data.enddate,
				format = 'YYYY年MM月DD日'

			if (moment(startDate, format).valueOf() == moment(endDate, format).valueOf()) {
				_postCreate()
			} else {

				if (moment(startDate, format).isAfter(moment(endDate, format))) {
					alert('结束时间不能早于起始时间！请重新选择！')
					return
				}

				if (moment(endDate, format).isAfter(moment())) {
					alert('结束时间最晚只能设置到昨天！请重新选择！')
					return
				}

				if (moment(endDate, format).valueOf() - moment(startDate, format).valueOf() >= 316224000000) {
					alert('结束时间与起始时间不能超过一年！请重新选择！')
					return
				}

				_postCreate()
			}


		}

		function _postCreate() {
			yService.createReport({
				startDate: $filter('date')($scope.data.startdate, 'yyyyMMdd'),
				endDate: $filter('date')($scope.data.enddate, 'yyyyMMdd')
			}).then(function(data) {
				if (data.data.result == 0) {
					alert("申请成功！")
					$scope.data.startdate = ""
					$scope.data.enddate = ""
					_getList()
				} else {
					alert(ERR_MSG[data.data.result])
				}
			})
		}

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
				} else {
					alert(ERR_MSG[data.data.result])
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