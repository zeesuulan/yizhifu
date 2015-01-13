'use strict';

angular.module('yizhifuApp')
  .controller('InfoModifyinfoCtrl', function ($rootScope, $scope) {

    	$rootScope.$on("$profileReady", function(){
    		$scope.nickname = $rootScope.profile.nickname
    	})

    	$scope.modifyInfoClick = function(){
    		if(!$scope.nickname || !$scope.passwd) {
    			alert("请输入用户姓名和密码！")
                return
    		}
    		console.log($scope.nickname, $scope.passwd)
    	}
  });
