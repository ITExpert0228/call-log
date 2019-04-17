app.controller('HomeCtrl', ['$scope', '$cookieStore', 'authService', function($scope, $cookieStore, authService) {

    $scope.name = 'Homepage';
    $scope.loggedInUser = $cookieStore.get("user");
    $scope.prefix = '/manager';

    if ($scope.loggedInUser.role == "admin") {
        $scope.isAdmin = true;
        $scope.isUser = false;
        $scope.prefix = '/admin';
    } else {
        $scope.isUser = true;
        $scope.isAdmin = false;
    }

    $scope.logout = function() {
        authService.logout().then(function() {
            window.location.href = '/login';
        });
    }
}]);