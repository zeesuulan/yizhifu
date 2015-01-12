'use strict';

/**
 * @ngdoc function
 * @name yizhifuApp.controller:InfoUserListCtrl
 * @description
 * # InfoUserListCtrl
 * Controller of the yizhifuApp
 */
angular.module('yizhifuApp')
	.controller('InfoUserListCtrl', function($scope, $filter, yService) {

		$scope.config = {
			itemsPerPage: 20
		}

		$scope.people = []
		$scope.filtedPeopleList = []

		yService.getUserList().then(function(data){
			if(data.data.result == 0) {
				$scope.people = data.data.users
				$scope.filtedPeopleList = $scope.people
				console.log($scope.people)
			}
		})

		$scope.updateFilterPeopleList = function() {
			$scope.filtedPeopleList = $filter("byKeyMatch")("username", $scope.usernameQuery, $scope.people)
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