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

		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";


		var postFun = function(data, apiName) {
				return $http.post('/api/' + apiName, data)
			},
			getFun = function(data, apiName) {
				return $http({
					url: '/api/' + apiName,
					method: "GET",
					params: data
				})
			}

		return {
			login: function(data) {
				return postFun(data, 'login')
			},
			logout: function() {
				return postFun({}, 'logout')
			},
			assert: function() {
				return postFun({}, 'assert')
			},
			getUserList: function(data) {
				return getFun(data, 'userList')
			},
			// userCRUD: function(data){
			// 	return postFun(data, 'userCRUD')
			// },
			userCreate: function(data) {
				return postFun(data, 'userCreate')
			},
			userDelete: function(data){
				return postFun(data, 'userDelete')
			},
			userChangeNickname: function(data){
				return postFun(data, 'userChangeNickname')
			}
			getProvinceList: function() {
				return getFun({}, "provinceList")
			},
			selectProvince: function() {
				return postFun({}, "selectProvince")
			}
		}
	})