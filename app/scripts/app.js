'use strict';

window.ERR_MSG = [
    "",
    "提交内容错误！",
    "用户不存在！",
    "用户已存在！",
    "密码错误！",
    "目标账户不存在！",
    "缺少原密码！",
    "账户已被锁定，请联系管理员！",
    "当前账户不具备该操作权限！",
    "登录过期，请重新登录！",
    "您尚未登录！",
    "起止时间设置错误！",
    "您尚未选择对应省份，无法操作！",
    "系统正忙！",
];
/**
 * @ngdoc overview
 * @name yizhifuApp
 * @description
 * # yizhifuApp
 *
 * Main module of the application.
 */


angular
    .module('yizhifuApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        // 'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('index', {
                url: '',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('usermanagement', {
                url: '/usermanagement',
                templateUrl: 'views/usermanagement.html',
                controller: 'UserManageMementCtrl'
            })
            .state('info', {
                url: '/info',
                templateUrl: 'views/info.html',
                controller: 'InfoCtrl'
            })
            .state('info.userlist', {
                url: '/userlist',
                templateUrl: 'views/info/userlist.html',
                controller: 'InfoUserListCtrl'
            })

    }).run(function($location, $rootScope, yService) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            yService.assert().then(function(data) {
                
                if (toState.url != '' && data.data.result != 0) { //非首页 未登录
                    $location.url('')
                } else if (toState.url == "" && data.data.result == 0) {
                    $location.url('/info')
                }
            })

        })
    })