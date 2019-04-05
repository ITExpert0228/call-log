var app = angular.module('msApp', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        templateUrl: 'modules/home/home.html',
        controller: 'HomeCtrl'
    }).when('/products', {
        templateUrl: 'modules/products/products.html',
        controller: 'ProductsCtrl'
    }).when('/ranking', {
        templateUrl: 'modules/ranking/ranking.html',
        controller: 'RankingCtrl'
    }).when('/who_we_are', {
        templateUrl: 'modules/who/who.html',
        controller: 'WhoCtrl'
    }).when('/earn_money', {
        templateUrl: 'modules/earn/earn.html',
        controller: 'EarnCtrl'
    }).when('/login', {
        templateUrl: 'modules/auth/login.html',
        resolve: {
            user: ['$cookieStore', '$q', function ($cookieStore, $q) {
                var user = $cookieStore.get("user")
                if (user != null) {
                    if (user.role == "admin") window.location.href = '/admin';
                    else window.location.href = '/manager';
                }
            }]
        },
        controller: 'AuthCtrl'
    }).when('/register', {
        templateUrl: 'modules/auth/register.html',
        resolve: {
            user: ['$cookieStore', '$q', function ($cookieStore, $q) {
                var user = $cookieStore.get("user")
                if (user != null) {
                    if (user.role == "admin") window.location.href = '/admin';
                    else window.location.href = '/manager';
                }
            }]
        },
        controller: 'AuthCtrl'
    }).otherwise({ redirectTo: '/' });

});