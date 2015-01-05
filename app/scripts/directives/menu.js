'use strict';

/**
 * @ngdoc directive
 * @name yizhifuApp.directive:yMenu
 * @description
 * # yMenu
 */
angular.module('yizhifuApp')
  .directive('yMenu', function () {
    return {
      templateUrl: 'views/part/menu.html',
      restrict: 'A',
      replace: true,
      link: function postLink(scope, element, attrs) {
      }
    };
  });
