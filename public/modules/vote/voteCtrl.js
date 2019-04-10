app.controller('VoteCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
    $scope.name = 'Votepage';

    $scope.param = parseInt($routeParams.param);

    if ($scope.param == 1) {
        $scope.teamA = {
            name:'Nancy Pelosi',
            src:'img/vote/1l.jpg',
            detail:'Simple Explanation of the Tag'
        }
        $scope.teamB = {
            name: 'Donald John Trump',
            src:'img/vote/1r.jpg',
            detail:'Simple Explanation of the Tag'
        }
    } else if ($scope.param == 2) {
        $scope.teamA = {
            name:'Jeff Bezos',
            src:'img/vote/2l.jpg',
            detail:'Simple Explanation of the Tag'
        }
        $scope.teamB = {
            name:'Donald John Trump',
            src:'img/vote/2r.jpg',
            detail:'Simple Explanation of the Tag'
        }
    } else {
        $scope.teamA = {
            name:'Ferrari',
            src:'img/vote/3l.png',
            detail:'Simple Explanation of the Tag'
        }
        $scope.teamB = {
            name:'Lamborghini',
            src:'img/vote/3r.png',
            detail:'Simple Explanation of the Tag'
        }
    }

    $scope.$on('$viewContentLoaded', function(){
 
    });

    
}]);