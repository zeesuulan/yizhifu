'use strict';

/**
 * @ngdoc directive
 * @name yizhifuApp.directive:yPagination
 * @description
 * # yPagination
 */

angular.module('yizhifuApp')
	.directive('yPagination', function() {
		return {
			templateUrl: 'views/part/pagination.html',
			restrict: 'A',
			scope: {
				maxPage: "=",
				currentPage: "=",
				nId: "="
			},
			replace: true,
			link: function(scope, element, attrs) {

				scope.getNumber = function(num) {
					return new Array(num);
				}

				scope.first = function() {
					if (scope.currentPage != 1) {
						scope.$emit(scope.nId + "-first")
					}
				}

				scope.end = function() {
					if (scope.currentPage != scope.maxPage) {
						scope.$emit(scope.nId + "-end")
					}
				}

				scope.pre = function() {
					if (scope.currentPage > 1) {
						scope.$emit(scope.nId + "-pre", scope.currentPage - 1)
					}
				}

				scope.next = function() {
					if (scope.currentPage < scope.maxPage) {
						scope.$emit(scope.nId + "-next", scope.currentPage + 1)
					}
				}

				scope.go = function(page) {
					if (scope.currentPage != page && (page > 0 && page <= scope.maxPage)) {
						scope.$emit(scope.nId + "-go", page)
					}
				}

				scope.getCurrentPage = function() {
					return scope.currentPage
				}
			}
		};
	});