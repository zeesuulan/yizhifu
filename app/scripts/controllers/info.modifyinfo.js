'use strict';

angular.module('yizhifuApp')
  .controller('InfoModifyinfoCtrl', function ($rootScope, $scope, yService) {

    	$rootScope.$on("$profileReady", function(){
            if($rootScope.profile)
    		$scope.nickname = $rootScope.profile.nickname
    	})

    	$scope.modifyInfoClick = function(){
    		if(!$scope.nickname || !$scope.passwd) {
    			alert("请输入要修改的用户姓名和密码！")
                return
    		}

            yService.userChangeNickname({
                nickname: $scope.nickname,
                password: $scope.passwd,
                userid: $rootScope.profile.userId
            }).then(function(data){
                $scope.passwd = ""
                if (data.data.result == 0) {
                    alert("修改成功！")
                    $rootScope.getProfile()
                } else {
                    alert(ERR_MSG[data.data.result])
                }
            })
    	}
  });
