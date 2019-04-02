app.controller('AuthCtrl', ['$scope', '$location', 'authService', function($scope, $location, authService) {
    $scope.name = 'Authpage';

    $scope.login = function() {
        authService.login('rha1990@hotmail.com', 'aaaa')
        window.location.href = '/admin';
        // $location.path('/admin');
    }

    $scope.register = function() {
        
    }

    $scope.$on('$viewContentLoaded', function(){
        $('#datepicker').datepicker({
            showOtherMonths: true
        });
    
        $('#dropdown').dropdown();
    })
}]);