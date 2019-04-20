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
    }).when('/ranking/:param', {
        templateUrl: 'modules/ranking/ranking.html',
        controller: 'RankingCtrl'
    }).when('/ranking/:type/:param', {
        templateUrl: 'modules/ranking/ranking.html',
        controller: 'RankingCtrl'
    }).when('/who_we_are', {
        templateUrl: 'modules/who/who.html',
        controller: 'WhoCtrl'
    }).when('/earn_money', {
        templateUrl: 'modules/earn/earn.html',
        controller: 'EarnCtrl'
    }).when('/voting/:param', {
        templateUrl: 'modules/vote/vote.html',
        controller: 'VoteCtrl'
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
})
.run(['$cookieStore', function($cookieStore) {

    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
    var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
    pc.createDataChannel('');//create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
    pc.onicecandidate = function(ice)
    {
    if (ice && ice.candidate && ice.candidate.candidate)
    {
    var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
    console.log('my IP: ', myIP);   
    $cookieStore.put('userip', myIP);
    pc.onicecandidate = noop;
    }
    };
}]);