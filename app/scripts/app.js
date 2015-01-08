'use strict';

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
                url: '/index',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('usermanagement', {
                url:'/usermanagement',
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
            // .otherwise({
            //     redirectTo: 'index'
            // });

        $stateProvider.state('welcome', {
            template: "welcome"
        })


    }).run(function() {


        console.log('Run')
            //check 是否登录
    })