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
				scope.isShowLogQuery = false

				var toggle = {
					"userManagement": function() {
						scope.isShowUserManagement = !scope.isShowUserManagement
						scope.isShowSettleManagement = false
						scope.isShowLogQuery = false
					},
					"settleManagement": function() {
						scope.isShowUserManagement = false
						scope.isShowSettleManagement = !scope.isShowSettleManagement
						scope.isShowLogQuery = false
					},
					"logQuery": function() {
						scope.isShowUserManagement = false
						scope.isShowSettleManagement = false
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