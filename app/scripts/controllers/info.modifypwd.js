'use strict';

angular.module('yizhifuApp')
    .controller('InfoModifypwdCtrl', function($rootScope, $scope, yService) {


        $scope.modifyPwdClick = function() {
            if (!$scope.oldpwd ||
                !$scope.newpwd) {
                alert("请输入需要原始密码和新密码！")
                return
            }

            if ($scope.newpwd != $scope.newpwd_confirm) {
                alert("两次输入的密码不一致！")
                return
            }

            yService.userChangePassword({
                password: $scope.newpwd,
                oldPassword: $scope.oldpwd,
                userid: $rootScope.profile.userId
            }).then(function(data) {
                if (data.data.result == 0) {
                    alert("密码修改成功！")
                    $scope.newpwd = $scope.newpwd_confirm = $scope.oldpwd = ""
                } else {
                    alert(ERR_MSG[data.data.result])
                }
            })

        }
    });