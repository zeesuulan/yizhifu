'use strict';

/**
 * @ngdoc directive
 * @name yizhifuApp.directive:yMenu
 * @description
 * # yMenu
 */
angular.module('yizhifuApp')
	.directive('yMenu', function() {
		return {
			templateUrl: 'views/part/menu.html',
			restrict: 'A',
			replace: true,
			link: function postLink(scope, element, attrs) {


				scope.isShowUserManagement = false
				scope.isShowSettleManagement = false

				var toggle = {
					"userManagement": function() {
						scope.isShowUserManagement = !scope.isShowUserManagement
					},
					"settleManagement": function() {
						scope.isShowSettleManagement = !scope.isShowSettleManagement
					},
					"logQuery": function() {
						scope.isShowLogQuery = !scope.isShowLogQuery
					}
				}

				scope.open = function(type) {
					if (!scope.province) {
						alert("请选择省平台!")
						return
					}
					if (typeof(toggle[type]) == 'function') {
						toggle[type].call()
					}
				}



			}
		};
	});