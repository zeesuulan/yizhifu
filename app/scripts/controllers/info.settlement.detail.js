'use strict';

angular.module('yizhifuApp')
  .controller('InfoSettlementDetailCtrl', function ($scope, $stateParams) {
  	
   		// console.log($scope.merchantid)

   		$scope.dpconfig = {
   			dropdownSelector: '.my-toggle-select',
   			startView: 'year',
   			minView: 'day'

   		}

   		$scope.filtedMerchantDetailList = []
  });
