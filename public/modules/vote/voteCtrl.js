app.controller('VoteCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
    $scope.name = 'Votepage';
	$('#LoadingLoop').show();
    $scope.param = $routeParams.param;

    if ($scope.param == '5cacfe0f1071b942d8108b1a') {
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
    } else if ($scope.param == '5cacfe0f1071b942d8108b1b') {
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
 		setTimeout(function(){
            $('#LoadingLoop').hide();
        }, 500)
    });

    
}]);