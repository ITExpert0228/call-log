var app = angular.module('msApp', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);
    $routeProvider.when('/admin', {
        templateUrl: 'admin/modules/dashboard/dashboard.html',
        resolve: {
            user: ['$cookieStore', '$q', function ($cookieStore, $q) {
                var user = $cookieStore.get("user")
                if (!user || user == null) {
                    window.location.href = '/';
                }
            }]
        },
        controller: 'DashboardCtrl'
    }).when('/manager', {
        templateUrl: 'admin/modules/dashboard/dashboard.html',
        resolve: {
            user: ['$cookieStore', '$q', function ($cookieStore, $q) {
                var user = $cookieStore.get("user")
                if (!user || user == null) {
                    window.location.href = '/';
                }
            }]
        },
        controller: 'DashboardCtrl'
    }).when('/admin/users', {
        templateUrl: 'admin/modules/user/user.html',
        controller: 'UserCtrl'
    }).otherwise({ redirectTo: '/admin' });
});