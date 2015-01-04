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
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/usermanagement', {
                templateUrl: 'views/usermanagement.html',
                controller: 'UserManageMementCtrl'
            })
            .when('/info', {
              templateUrl: 'views/info.html',
              controller: 'InfoCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run(function() {
        console.log("Run")
            //check 是否登录
    })
