'use strict';

angular.module('yizhifuApp')
	.controller('InfoLogqueryCtrl', function($scope, yService) {


		$scope.logList = []

		getLogs()

		function getLogs() {
			yService.queryLog().then(function(data) {
				if (data.data.result == 0) {
					console.log(data)
				} else {
					alert(ERR_MSG[data.data.result])
				}
			})
		}
	});