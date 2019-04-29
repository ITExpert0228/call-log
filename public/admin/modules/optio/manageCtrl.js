app.controller('ManageCtrl', ['$scope', 'categoryService', 'mediaService', 'optioService', '$cookieStore', '$filter', function($scope, categoryService, mediaService, optioService, $cookieStore, $filter) {

    $scope.allOptio = [];
    $scope.searchOptio = [];
    optioService.getAll().then(function(data){
        angular.forEach(data, function (optio) {
            $scope.allOptio.push(optio);
            $scope.searchOptio.push(optio);
        });
    }, function (err) {
        console.log(err)
    }) 

    $scope.search = function() {
        $scope.searchOptio = [];
        angular.forEach($scope.allOptio, function (optio) {
            if (optio.oLMedia.mName.toLowerCase().search($scope.searchTag.toLowerCase()) > -1 || optio.oRMedia.mName.toLowerCase().search($scope.searchTag.toLowerCase()) > -1) $scope.searchOptio.push(optio);
        });
    }
    
    $scope.$on('$viewContentLoaded', function(){

    })
}]);