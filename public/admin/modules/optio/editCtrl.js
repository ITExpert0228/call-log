app.controller('EditCtrl', ['$scope', 'categoryService', 'mediaService', 'optioService', '$cookieStore', '$routeParams', function($scope, categoryService, mediaService, optioService, $cookieStore, $routeParams) {
    
    $scope.categorys = [];
    $scope.loggedInUser = $cookieStore.get("user");

    categoryService.getAll().then(function(data){
        $scope.categorys = data;
        $scope.categorys.push({id:'null', cName:'Create a Category'})
    }, function (err) {
        console.log(err)
    })

    $scope.allUserMedia = [];
    mediaService.getAll().then(function(data){
        angular.forEach(data, function (media) {
            if (media.mUser == $scope.loggedInUser.id) {
              $scope.allUserMedia.push(media);
            }
        });

    }, function (err) {
        console.log(err)
    }) 

    $scope.createVote = function(){
        // var formData = new FormData();
        // var data = document.getElementById('inputCImage').files[0];
        // formData.append('optio', data);
        // $.ajax("/api/optio/upload", {
        //     method: "POST",
        //     data: formData,
        //     processData: false,
        //     contentType: false,
        //     success: function (res) {
        //         console.log(res)
                var optioObj = {
                    oLeft: $scope.loggedInUser.id,
                    oRight: $scope.loggedInUser.id,
                    oCImage: '',
                    oUser: $scope.loggedInUser.id
                }
                // if ($scope)
                optioService.create(optioObj).then(function(newOptio){
                    console.log(newOptio);
                    swal({   
                        title: "Optio",   
                        text: "Optio Successfully Created!",   
                        // imageUrl: newOptio.oCImage.replace('\\', '/'),
                    });
                }, function (err) {
        
                });     
        //     },
        //     error: function (err) {
        //         console.log(err);
        //     }
        // });
    }

    $scope.$on('$viewContentLoaded', function(){
        var $imageL = $('#imageL');

        $imageL.cropper({
            aspectRatio: 1,
            autoCropArea: 1,
            crop: function(event) {}
        });

        var $imageR = $('#imageR');

        $imageR.cropper({
            aspectRatio: 1,
            autoCropArea: 1,
            crop: function(event) {}
        });
    })
}]);