app.controller('CreateCtrl', ['$scope', 'categoryService', 'mediaService', 'optioService', '$cookieStore', '$routeParams', '$location', function($scope, categoryService, mediaService, optioService, $cookieStore, $routeParams, $location) {
    
    $scope.categorys = [];
    $scope.loggedInUser = $cookieStore.get("user");

    categoryService.getAll().then(function(data){
        $scope.categorys = data;
        $scope.categorys.push({id:'null', cName:'Create a Category'})
    }, function (err) {
        console.log(err)
    })

    categoryService.getTopics().then(function(data){
        $scope.topics = data;
        $scope.topics.push({id:'null', cName:'Create a Topic'});
        $(".select2").select2();
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
    });

    $scope.categoryChanged = function() {
        if ($scope.selectedCategory == 'null') $scope.newCat = true;
    }

    $scope.saveNewTopic = function() {
        var categoryObj = {
            cName: $scope.tagName,
            cIsTopic: true
        }
        categoryService.create(categoryObj).then(function(newCategory) {
            console.log(newCategory);
            categoryService.getTopics().then(function(data){
                $scope.topics = data;
                $.toast({
                    heading: 'Topic Successfully created!',
                    text: 'Topic Name: ' + newCategory.cName,
                    position: 'top-right',
                    loaderBg:'#68ff49',
                    icon: 'info',
                    hideAfter: 2000
                });
                $scope.newCat = false;
                $scope.selectedCategory = newCategory.id;
            }, function (err) {
                console.log(err)
            });
            
        }, function (err) {
            console.log(err);
        })
    }

    $scope.lMediaName = 'Left Position';
    $scope.rMediaName = 'Right Position';
    $scope.mediaSelect = function(mID, select_media, mName, pos) {
        if ($('#right-media').hasClass('active') || pos == 1) {
            $scope.rMediaID = mID;
            $scope.rMediaName = mName;
            $scope.rMediaImg = select_media;
            $('#right-media img').attr('src', 'uploads/'+select_media);
            $('#right-media img').cropper('destroy');
            var options = {
                aspectRatio: 1,
                autoCropArea: 1
            }
            $('#right-media .cropper-label').text($scope.rMediaName);
            $('#right-media img').cropper(options).on({
                "dragend.cropper" : function(e) {
                    $scope.selectMedia(1); 
                }
            });
        } else {
            $scope.lMediaID = mID;
            $scope.lMediaName = mName;
            $scope.lMediaImg = select_media;
            $('#left-media img').attr('src', 'uploads/'+select_media);
            $('#left-media img').cropper('destroy');
            var options = {
                aspectRatio: 1,
                autoCropArea: 1
            }
            $('#left-media .cropper-label').text($scope.lMediaName);
            $('#left-media img').cropper(options).on({
                "dragend.cropper" : function(e) {
                    $scope.selectMedia(0);
                }
            });
        }
    }

    $scope.selectMedia = function(position) {
        if (position == 1) {
            $('#left-media .cropper-label').text($scope.lMediaName);
            $('#right-media').addClass('active');
            $('#left-media').removeClass('active');
            $('#right-media .cropper-label').text('Select Media');
        } else if (position == 2) {
            const tmp1 = $scope.rMediaImg;
            const tmp2 = $scope.rMediaName;
            const tmp3 = $scope.lMediaImg;
            const tmp4 = $scope.lMediaName;
            const tmp5 = $scope.rMediaID;
            const tmp6 = $scope.lMediaID;
            $('#right-media').removeClass('active');
            $('#left-media').removeClass('active');
            $scope.mediaSelect(tmp5, tmp1, tmp2, 2);
            $scope.mediaSelect(tmp6, tmp3, tmp4, 1);
        } else {
            $('#left-media').addClass('active');
            $('#right-media').removeClass('active');
            $('#right-media .cropper-label').text($scope.rMediaName);
            $('#left-media .cropper-label').text('Select Media');
        }
    }

    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
      
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
      
        // create a view into the buffer
        var ia = new Uint8Array(ab);
      
        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
      
        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        return blob;
      
    }

    $scope.createVote = function(){    
        var formData = new FormData();

        var $imageL = $('#imageL');
        var $imageR = $('#imageR');
        var dataURLL = $imageL.cropper("getDataURL", "image/jpeg");
        var dataURLR = $imageR.cropper("getDataURL", "image/jpeg");
        var blob = dataURItoBlob(dataURLL);
        var blob1 = dataURItoBlob(dataURLR);
        formData.append('optios', blob, '1.jpg');
        formData.append('optios', blob1, '2.jpg');
        $.ajax("/api/optio/uploads", {
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res);
                var optioObj = {
                    oLMedia: $scope.lMediaID,
                    oRMedia: $scope.rMediaID,
                    oUser: $scope.loggedInUser.id,
                    oCategory: $scope.selectedCategory,
                    oLImage: res[0],
                    oRImage: res[1]
                }
                optioService.create(optioObj).then(function(newOptio){
                    $.toast({
                        heading: 'Optio Creation',
                        text: 'Optio Successfully Created!',
                        position: 'top-right',
                        loaderBg:'#68ff49',
                        icon: 'info',
                        hideAfter: 2000
                    });
                    $location.path('/manager/manage');
                }, function (err) {
        
                });     
            },
            error: function (err) {
                console.log(err);
            }
        });
    
        // $.ajax("/api/optio/upload", {
        //     method: "POST",
        //     data: formData,
        //     processData: false,
        //     contentType: false,
        //     success: function (res) {
        //         console.log(res)
        //         var optioObj = {
        //             oLMedia: $scope.LImage,
        //             oRMedia: $scope.RImage,
        //             oUser: $scope.loggedInUser.id
        //         }
        //         if ($scope)
        //         optioService.create(optioObj).then(function(newOptio){
        //             swal({   
        //                 title: "Optio",   
        //                 text: "Optio Successfully Created!",   
        //                 // imageUrl: newOptio.oCImage.replace('\\', '/'),
        //             });
        //         }, function (err) {
        
        //         });     
        //     },
        //     error: function (err) {
        //         console.log(err);
        //     }
        // });
    }

    $scope.$on('$viewContentLoaded', function(){
        var $imageL = $('#imageL');

        $('#ledit-rotate-left').click(function(){
            $imageL.cropper('rotate', -90);
        });
        $('#ledit-rotate-right').click(function(){
            $imageL.cropper('rotate', 90);
        });
        $('#ledit-flip-h').click(function(){
            $imageL.cropper('scale', -1, 1);
        });
        $('#ledit-flip-v').click(function(){
            $imageL.cropper('scale', 1, -1);
        });
        $('#ledit-zoom-plus').click(function(){
            $imageL.cropper('zoom', 0.1);
        });
        $('#ledit-zoom-minus').click(function(){
            $imageL.cropper('zoom', -0.1);
        });

        var $imageR = $('#imageR');

        $('#redit-rotate-left').click(function(){
            $imageR.cropper('rotate', -90);
        });
        $('#redit-rotate-right').click(function(){
            $imageR.cropper('rotate', 90);
        });
        $('#redit-flip-h').click(function(){
            $imageR.cropper('scale', -1, 1);
        });
        $('#redit-flip-v').click(function(){
            $imageR.cropper('scale', 1, -1);
        });
        $('#redit-zoom-plus').click(function(){
            $imageR.cropper('zoom', 0.1);
        });
        $('#redit-zoom-minus').click(function(){
            $imageR.cropper('zoom', -0.1);
        });
    })
}]);