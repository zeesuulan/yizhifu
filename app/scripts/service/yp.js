'use strict';

/**
 * @ngdoc function
 * @name yizhifuApp.service:yService
 * @description
 * # yService
 * Service of the yizhifuApp
 */
angular.module('yizhifuApp')
	.factory('yService', function($http) {

		var postFun = function(data, apiName) {
			return $http.post('/api/' + apiName, data)
		}

		return {
			login: function(data) {
				return postFun(data, 'login')
			},
			assert: function() {
				return postFun({}, 'assert')
			}
		}
	})