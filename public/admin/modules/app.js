var app = angular.module('msApp', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);
    $routeProvider.when('/admin', {
        templateUrl: 'admin/modules/dashboard/dashboard.html',
        resolve: {
            user: ['$cookieStore', '$q', function ($cookieStore, $q) {
                    if ($cookieStore.get("user") || $q.reject({ unAuthorized: true })) {
                    } else {
                        alert("Invalid permission!");
                        $location.path('/');
                    }
                }]
        },
        controller: 'DashboardCtrl'
    }).when('/admin/users', {
        templateUrl: 'admin/modules/users/users.html',
        controller: 'UsersCtrl'
    }).otherwise({ redirectTo: '/admin' });

});