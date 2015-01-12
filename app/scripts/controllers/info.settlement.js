'use strict';

angular.module('yizhifuApp')
	.controller('InfoSettlementCtrl', function($scope) {

		$scope.merchantQuery = {
			city: "",
			county: "",
			zone: "",
			name: "",
			first: "",
			second: ""
		}
		//商户ID、商户名称、所属市、所属区县、所属商圈、一级行业、二级行业、商户地址、结算
		$scope.merchant = [{
			id: "1",
			name: "xxxxxxxxxxxx",
			city: "xxxxxx",
			county: "xxddxxdd",
			zone: "zonezonezone",
			first: "firstfirstfirstfirst",
			second: "secondsecond",
			address: "secondsecondsecondsecondsecondsecondsecond"
		}, {
			id: "2",
			name: "xxx",
			city: "xx",
			county: "xxdd",
			zone: "zone",
			first: "first",
			second: "second",
			address: ""
		}]

		$scope.filtedMerchantList = $scope.merchant


	});