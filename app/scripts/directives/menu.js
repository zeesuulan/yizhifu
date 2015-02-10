'use strict';

/**
 * @ngdoc directive
 * @name yizhifuApp.directive:yMenu
 * @description
 * # yMenu
 */
angular.module('yizhifuApp')
	.directive('yMenu', function($cookieStore, $rootScope, $state) {
		return {
			templateUrl: 'views/part/menu.html',
			restrict: 'A',
			replace: true,
			link: function postLink(scope, element, attrs) {

				scope.isShowUserManagement = false
				scope.isShowSettleManagement = false
				scope.isShowLogQuery = false
				scope.currentURL = $state.current.url

				openList()

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

				$rootScope.$on('$stateChangeStart', function(event, toState) {
					scope.currentURL = toState.url
					openList()
				})

				function openList() {
					if ($.inArray(scope.currentURL, ['userlist', 'modifyinfo', 'modifypwd']) > -1) {
						scope.isShowUserManagement = true
						scope.isShowSettleManagement = false
						scope.isShowLogQuery = false
					} else if ($.inArray(scope.currentURL, ['settlement', 'ledgerquery']) > -1) {
						scope.isShowUserManagement = false
						scope.isShowSettleManagement = true
						scope.isShowLogQuery = false
					} else if ($.inArray(scope.currentURL, ['logquery']) > -1) {
						scope.isShowUserManagement = false
						scope.isShowSettleManagement = false
						scope.isShowLogQuery = true
					}
				}

				scope.open = function(type) {
					if ($rootScope.profile.role != 0 && !$cookieStore.get('provinceId')) {
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