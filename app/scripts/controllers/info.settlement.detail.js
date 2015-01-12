'use strict';

angular.module('yizhifuApp')
	.controller('InfoSettlementDetailCtrl', function($scope, $filter, $stateParams) {

		// console.log($scope.merchantid)

		$scope.dpconfig_start = $scope.dpconfig_end = {
			dropdownSelector: '.my-toggle-select-start',
			startView: 'year',
			minView: 'day'
		}

		$scope.dpconfig_end.dropdownSelector = '.my-toggle-select-end'

		$scope.onTimeSet = function(newDate, oldDate) {
			if (newDate != oldDate) {
				console.log($filter('date')(newDate), oldDate)
			}
		}

		$scope.filtedMerchantDetailList = []
	});