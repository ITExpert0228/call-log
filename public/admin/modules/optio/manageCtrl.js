app.controller('ManageCtrl', ['$scope', 'categoryService', 'mediaService', 'optioService', '$cookieStore', '$filter', function($scope, categoryService, mediaService, optioService, $cookieStore, $filter) {

    $scope.allOptio = [];
    optioService.getAll().then(function(data){
        angular.forEach(data, function (optio) {
            $scope.allOptio.push(optio);
        });
    }, function (err) {
        console.log(err)
    }) 
    
    $scope.$on('$viewContentLoaded', function(){

    })
}]);