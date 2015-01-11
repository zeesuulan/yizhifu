'use strict';

/**
 * @ngdoc function
 * @name yizhifuApp.controller:InfoUserListCtrl
 * @description
 * # InfoUserListCtrl
 * Controller of the yizhifuApp
 */
angular.module('yizhifuApp')
	.controller('InfoUserListCtrl', function($scope, $filter) {

		$scope.config = {
			itemsPerPage: 5
		}

		$scope.people = [{
			'username': "dd",
			'nickname': "ddddddd",
			'id': 17,
			"area": 1
		}, {
			'username': "ss",
			'nickname': "ssssssa",
			'id': 16,
			"area": 2
		}]


		$scope.fileterPeopleList = $scope.people

		$scope.updateFilterPeopleList = function() {
			$scope.fileterPeopleList = $filter("filter")($scope.people, $scope.usernameQuery)
		}

		$scope.modify = function(id){
			console.log("modify: " + id)
		}

		$scope.remove = function(id, nickname){
			if(window.confirm("确定删除" + nickname + "嘛？")){
				console.log("remove: " + id)
			}
		}

		$scope.resetPsw = function(id) {
			console.log("resetPsw: " + id + " success")
		}


	});