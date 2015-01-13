'use strict';

angular.module('yizhifuApp')
  .controller('InfoModifypwdCtrl', function ($scope) {
    

    $scope.modifyPwdClick = function(){
    	if(!$scope.oldpwd ||
    		!$scope.newpwd){
    		alert("请输入需要原始密码和新密码！")
    		return
    	}

    	if($scope.newpwd != $scope.newpwd_confirm) {
    		alert("两次输入的密码不一致！")
    		return
    	}

    	console.log($scope.oldpwd, $scope.newpwd, $scope.newpwd_confirm)

    }
  });
