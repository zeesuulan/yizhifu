'use strict';

window.ERR_MSG = {
    "0": "",
    "1": "提交内容错误！",
    "2": "用户不存在！",
    "3": "用户已存在！",
    "4": "已登录",
    "5": "密码错误！",
    "6": "密码输入错误！",
    "7": "角色权限不对！",
    "8": "输入的旧密码不对！",
    "9": "当前账号已被锁定，请联系管理员！",
    "10": "",
    "11": "您缺少权限！",
    "12": "登录超时，请重新登录！",
    "13": "登录已超时，请重新登录！",
    "14": "选择的日期不对！",
    "15": "您尚未选择对应省份，无法操作！",
    "100": "系统正忙！",
};
window.ROLE = [
    "超级管理员",
    "全国结算员",
    "省结算员"
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
        'ui.router',
        'ui.bootstrap.datetimepicker'
    ])
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider
            .state('index', {
                url: '/',
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
                templateUrl: 'views/info.userlist.html',
                controller: 'InfoUserListCtrl'
            })
            .state('info.modifypwd', {
                url: 'modifypwd',
                templateUrl: 'views/info.modifypwd.html',
                controller: 'InfoModifypwdCtrl'
            })
            .state('info.modifyinfo', {
                url: 'modifyinfo',
                templateUrl: 'views/info.modifyinfo.html',
                controller: 'InfoModifyinfoCtrl'
            })
            //=============用户管理
            //=============商户管理
            .state('info.settlement', {
                url: 'settlement',
                templateUrl: 'views/info.settlement.html',
                controller: 'InfoSettlementCtrl'
            })
            .state('info.settlementDetail', {
                url: 'settlement/:merchantid',
                templateUrl: 'views/info.settlement.detail.html',
                controller: 'InfoSettlementDetailCtrl'
            })
            .state('info.ledgerquery', {
                url: 'ledgerquery',
                templateUrl: 'views/info.ledgerquery.html',
                controller: 'InfoLedgerqueryCtrl'
            })
            //=============商户管理
            //=============日志管理
            .state('info.logquery', {
                url: 'logquery',
                templateUrl: 'views/info.logquery.html',
                controller: 'InfoLogqueryCtrl'
            })

        $urlRouterProvider.otherwise('/')

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

        moment.locale("zh-cn")

    }).run(function($state, $rootScope, yService) {

        $rootScope.profile = {}

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            yService.assert().then(function(data) {

                $rootScope.profile = data.data.profile
                //告诉要用值的地方，值ok了。
                $rootScope.$broadcast("$profileReady")

                // if (!$state.is('index') && data.data.result != 0) { //非首页 未登录
                //     $state.go('index')
                // } else if ($state.is('index') && data.data.result == 0) {
                //     $state.go('info')
                // }
            })

        })

        //获取全部省份
        yService.getProvinceList().then(function(data){
            console.log(data)
        })

        yService.selectProvince().then(function(data){
            console.log(data)
        })
    }).filter("role", function() {
        return function(roleIndex) {
            return ROLE[roleIndex]
        }
    }).filter("byKeyMatch", function(){
        return function(keystr, matchstr, list) {
            var result = []
            angular.forEach(list, function(v, k){
                if(v[keystr].indexOf(matchstr) >= 0) {
                    this.push(v)
                }
            }, result)
            return result
        }
    })