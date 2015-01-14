'use strict';

angular.module('yizhifuApp')
  .controller('InfoModifyinfoCtrl', function ($rootScope, $scope, yService) {

    	$rootScope.$on("$profileReady", function(){
    		$scope.nickname = $rootScope.profile.nickname
    	})

    	$scope.modifyInfoClick = function(){
    		if(!$scope.nickname || !$scope.passwd) {
    			alert("请输入要修改的用户姓名和密码！")
                return
    		}

            yService.userCRUD({
                action: "update",
                nickname: $scope.nickname,
                password: $scope.passwd,
                userid: $rootScope.profile.userId
            }).then(function(data){
                console.log(data.data)
            })
    	}
  });
