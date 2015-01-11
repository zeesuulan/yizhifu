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
        'angular-table',
        'ngSanitize',
        'ngTouch',
        'ui.router'
    ])
    .config(function($stateProvider, $httpProvider) {

        $stateProvider
            .state('index', {
                url: '',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('info', {
                url: '/info/',
                templateUrl: 'views/info.html',
                controller: 'InfoCtrl'
            })
            //=============用户管理
            .state('info.userlist', {
                url: 'userlist',
                templateUrl: 'views/info/userlist.html',
                controller: 'InfoUserListCtrl'
            })
            .state('info.modifypwd', {
                url: 'modifypwd',
                templateUrl: 'views/info/modifypwd.html',
                controller: 'InfoModifypwdCtrl'
            })
            .state('info.modifyinfo', {
                url: 'modifyinfo',
                templateUrl: 'views/info/modifyinfo.html',
                controller: 'InfoModifyinfoCtrl'
            })
            //=============用户管理
            //=============商户管理
            .state('info.settlement', {
                url: 'settlement',
                templateUrl: 'views/info/settlement.html',
                controller: 'InfoSettlementCtrl'
            })
            .state('info.ledgerquery', {
                url: 'ledgerquery',
                templateUrl: 'views/info/ledgerquery.html',
                controller: 'InfoLedgerqueryCtrl'
            })
            //=============商户管理
            //=============日志管理
            .state('info.logquery', {
                url: 'logquery',
                templateUrl: 'views/info/logquery.html',
                controller: 'InfoLogqueryCtrl'
            })



        var param = function(obj) {
            var query = '',
                name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];

    }).run(function($state, $rootScope, yService) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            yService.assert().then(function(data) {
                $rootScope.profile = data.data.profile
                // if (toState.url != '' && data.data.result != 0) { //非首页 未登录
                //     $state.go('index')
                // } else if (toState.url == "" && data.data.result == 0) {
                //     $state.go('info')
                // }
            })

        })
    })