var app = angular.module('msApp', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);
    $routeProvider.when('/admin', {
        templateUrl: 'admin/modules/dashboard/dashboard.html',
        resolve: {
            user: ['$cookieStore', '$location', '$q', function ($cookieStore, $location, $q) {
                var user = $cookieStore.get("user")
                if (!user || user == null) {
                    window.location.href = '/';
                } else if (user.role != "admin") {
                    $location.path('/manager');
                }
            }]
        },
        controller: 'DashboardCtrl'
    }).when('/admin/users', {
        templateUrl: 'admin/modules/user/user.html',
        resolve: {
            user: ['$cookieStore', '$q', function ($cookieStore, $q) {
                var user = $cookieStore.get("user")
                if (!user || user == null) {
                    window.location.href = '/';
                }
            }]
        },
        controller: 'UserCtrl'

    // manager module        
    }).when('/manager', {
        templateUrl: 'admin/modules/manager/manager.html',
        resolve: {
            user: ['$cookieStore', '$q', function ($cookieStore, $q) {
                var user = $cookieStore.get("user")
                if (!user || user == null) {
                    window.location.href = '/';
                }
            }]
        },
        controller: 'ManagerCtrl'
    }).when('/manager/create', {
        templateUrl: 'admin/modules/optio/create.html',
        controller: 'CreateCtrl',
        resolve: {
            user: ['$cookieStore', '$q', function ($cookieStore, $q) {
                var user = $cookieStore.get("user")
                if (!user || user == null) {
                    window.location.href = '/';
                }
            }]
        }
    }).when('/manager/inventory', {
        templateUrl: 'admin/modules/optio/inventory.html',
        controller: 'InventoryCtrl',
        resolve: {
            user: ['$cookieStore', '$q', function ($cookieStore, $q) {
                var user = $cookieStore.get("user")
                if (!user || user == null) {
                    window.location.href = '/';
                }
            }]
        }
    }).when('/manager/manage', {
        templateUrl: 'admin/modules/optio/manage.html',
        controller: 'ManageCtrl',
        resolve: {
            user: ['$cookieStore', '$q', function ($cookieStore, $q) {
                var user = $cookieStore.get("user")
                if (!user || user == null) {
                    window.location.href = '/';
                }
            }]
        }
    }).when('/manager/upload-media', {
        templateUrl: 'admin/modules/media/mupload.html',
        controller: 'MUploadCtrl',
        resolve: {
            user: ['$cookieStore', '$q', function ($cookieStore, $q) {
                var user = $cookieStore.get("user")
                if (!user || user == null) {
                    window.location.href = '/';
                }
            }]
        }
    }).when('/manager/manage-media', {
        templateUrl: 'admin/modules/media/mmanage.html',
        controller: 'MManageCtrl',
        resolve: {
            user: ['$cookieStore', '$q', function ($cookieStore, $q) {
                var user = $cookieStore.get("user")
                if (!user || user == null) {
                    window.location.href = '/';
                }
            }]
        }
    }).otherwise({ redirectTo: '/admin' });
});