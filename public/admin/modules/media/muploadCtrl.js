app.controller('MUploadCtrl', ['$scope', 'categoryService', 'mediaService', '$cookieStore', '$routeParams', '$location', function($scope, categoryService, mediaService, $cookieStore, $routeParams, $location) {

  $('#LoadingLoop').show();
    $scope.newCat = false;
    $scope.categorys = [];
    $scope.categoryTree = [];
    var cropperObj;
    $scope.loggedInUser = $cookieStore.get("user");

    categoryService.getAll().then(function(data){
        $scope.categorys = data;
        $scope.categorys.push({id:'null', cName:'Create a Category'});
        console.log(data);
        angular.forEach(data, function (category) {
            if (category.id == 'null') return;
            category.text = category.cName;
            category.nodes = [];
            if (category.cParent == null) {  
              $scope.categoryTree.push(category);
            } else {
              $scope.treeArray($scope.categoryTree, category);
            }
        });
        console.log($scope.categoryTree);
    }, function (err) {
        console.log(err)
    })
      

    mediaService.getAll().then(function(data){
        var resData = [];
        angular.forEach(data, function (media) {
            resData.push(media.mName);
            if (media.id == $routeParams.param) {
              $scope.tagName = media.mName;
              $scope.selectedCategory = media.mCategory;
              $scope.selectedImg = media.mImage;
            }
        });
        if (!$scope.selectedImg) $scope.selectedImg = '';///'admin/assets/images/select.jpg';

        // document.getElementById("image").src=$scope.selectedImg;

        $(".tagText").autocomplete({
            source: resData,
            minLength: 1,
            change: function() {
                // $(".tagText").val("").css("display", 2);
            }
        });

        $("#enableComplete").click(function(){
            $('.tagText').autocomplete('option', 'minLength', 0);
            $('.tagText').autocomplete('search', $('.tagText').val());
        });
    }, function (err) {
        console.log(err)
    }) 

    $scope.treeArray = function(arrTree, insertItem) {
        for (var i=0;i<arrTree.length;i++) {
          var treeItem = arrTree[i];
          if (treeItem.id == insertItem.cParent) {
            treeItem.nodes.push(insertItem); 
            return;
          } else if (treeItem.nodes.length > 0) {
            $scope.treeArray(treeItem.nodes, insertItem);
          }
        }
        
    }

    $scope.setType = function(type) {

    }

    $scope.categoryChanged = function() {
        if ($scope.selectedCategory == 'null') $('#newCatModal').modal();
    }

    $scope.saveCategory = function() {
        var blob = $("#input-file-category")[0].files[0];

        var formData = new FormData();
        formData.append('category', blob, '1.jpg');

        $.ajax("/api/category/upload", {
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                var treeViewObject = $('#treeview5').data('treeview');
                var categoryObj = {
                    cName: $scope.newModel,
                    cParent: treeViewObject.getSelected()[0]!=null?treeViewObject.getSelected()[0].id:null,
                    cImage: res.path
                }
                categoryService.create(categoryObj).then(function(newCategory) {
                    console.log(newCategory);
                    categoryService.getAll().then(function(data){
                        // $('#LoadingLoop').hide();
                        console.log(data);
                        // $scope.newCat = false;
                        // $scope.categorys = data;
                        // $scope.categorys.push({id:'null', cName:'Create a Category'});
                        // $scope.selectedCategory = newCategory.id;
                    }, function (err) {
                        // $('#LoadingLoop').hide();
                        console.log(err)
                    });
                    
                }, function (err) {
                    // $('#LoadingLoop').hide();
                    console.log(err);
                }) 
            },
            error: function (err) {
                console.log(err);
            }
        });

        // $('#LoadingLoop').show();
        
    }

    $scope.createCancel = function() {
        $scope.newCat = false;
        $scope.selectedCategory = '';
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

    $scope.save = function(type) {
        if (type == 1) {

        } else if (type == 2) {

        } else if (type == 3) {

        } else {
            var $image = $('#jcrop_img');
            var dataURL = $image.cropper("getDataURL", "image/jpeg");
            var blob = dataURItoBlob(dataURL);

            var formData = new FormData();
            formData.append('media', blob, '1.jpg');
            $.ajax("/api/media/upload", {
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {
                    console.log(res);
                    var mediaObj = {
                        mName: $scope.tagName,
                        mType: type,
                        mImage: res,
                        mUser: $scope.loggedInUser.id
                    }
                    mediaService.create(mediaObj).then(function(newMedia){
                        $.toast({
                            heading: 'Media Successfully created!',
                            text: 'Media Name: ' + newMedia.mName,
                            position: 'top-right',
                            loaderBg:'#68ff49',
                            icon: 'info',
                            hideAfter: 2000
                        });
                        
                        $location.path('/manager/create');
                    }, function (err) {
            
                    });     
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
        
        // console.log(cropper.getCroppedCanvas().toDataURL("image/jpeg", 0.7));
    }

    $scope.enableAutocomplete = function() {
        $('.tagText').autocomplete('enable');
    }

    $scope.$on('$viewContentLoaded', function(){
        
        $(document).ready(function() {
        
            var dataURItoBlob = function (dataURI) {
                var byteString = atob(dataURI.split(',')[1]);
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ab], {type: 'image/jpeg'});
            };
            
            Dropzone.autoDiscover = false;
            var c = 0;
            var editor = null;
            
            var myDropzone = new Dropzone("#image-dropzone-container", {
                addRemoveLinks: true,
                parallelUploads: 10,
                uploadMultiple: false,
                maxFiles: 10,
                init: function () {
                    // $('.edit-bar .btn').attr('disabled', true);
                    this.on('success', function (file) {
                        // var $button = $('<a href="#" class="js-open-cropper-modal" data-file-name="' + file.name + '">Crop & Upload</a>');
                        // $(file.previewElement).append($button);
                        var jcrop_api;
                        editor = document.createElement('div');
                        
                        editor.style.position = 'absolute';
                        editor.style.left = 0;
                        editor.style.right = 0;
                        editor.style.top = 0;
                        editor.style.bottom = 0;
                        editor.style.zIndex = 1000;
                        editor.style.backgroundColor = '#000';
                        $('#image-dropzone-container').append(editor);
                        editor.setAttribute("id", "jcrop_editor");
                        // Load the image
                        var image = new Image();
                        image.src = URL.createObjectURL(file);
                        image.setAttribute("id", "jcrop_img")
                        editor.appendChild(image);

                        // Append the editor to the page
                        // document.body.appendChild(editor);

                        // Create Cropper.js and pass image
                        var cropper = $(image).cropper({
                            aspectRatio: 1
                        });

                        $('#iedit-crop').click(function(){
                            
                        });

                        $('#iedit-rotate-left').click(function(){
                            cropper.cropper('rotate', -90);
                        });
                        $('#iedit-rotate-right').click(function(){
                            cropper.cropper('rotate', 90);
                        });
                        $('#iedit-flip-h').click(function(){
                            cropper.cropper('scale', -1, 1);
                        });
                        $('#iedit-flip-v').click(function(){
                            cropper.cropper('scale', 1, -1);
                        });
                        $('#iedit-zoom-plus').click(function(){
                            cropper.cropper('zoom', 0.1);
                        });
                        $('#iedit-zoom-minus').click(function(){
                            cropper.cropper('zoom', -0.1);
                        });

                        $('#iedit-camera-change').click(function(){
                            if (editor != null) {
                                editor.parentNode.removeChild(editor);
                                Dropzone.forElement("#image-dropzone-container").removeAllFiles(true);
                                editor = null;
                            }
                        });
                    });
                }
            });
            
            var videoDropzone = new Dropzone("#video-dropzone-container", {
                addRemoveLinks: true,
                parallelUploads: 10,
                uploadMultiple: false,
                maxFiles: 10,
                init: function () {
                    // $('.edit-bar .btn').attr('disabled', true);
                    var _CANVAS = document.querySelector("#video-canvas"),
                        _CTX = _CANVAS.getContext("2d");

                    this.on('success', function (file) {
                        if(['video/mp4'].indexOf(file.type) == -1) {
                            swal('Error : Only MP4 format allowed');
                            Dropzone.forElement("#video-dropzone-container").removeAllFiles(true);
                            return;
                        }
                        // var $button = $('<a href="#" class="js-open-cropper-modal" data-file-name="' + file.name + '">Crop & Upload</a>');
                        // $(file.previewElement).append($button);
                        var jcrop_api;
                        
                        var editor = document.createElement('video');
                        editor.setAttribute("id", "main-video");
                        editor.setAttribute("controls", "");
                        
                        $('#video-dropzone-container').append(editor);

                        var source = document.createElement('source');
                        source.setAttribute("id", "main-source");
                        source.setAttribute("type", "video/mp4");
                        source.setAttribute("src", URL.createObjectURL(file));

                        editor.appendChild(source);

                        var capture = document.createElement('span');
                        capture.setAttribute("id", "main-capture");
                        capture.setAttribute("class", "btn");
                        
                        $('#video-dropzone-container').append(capture);
                        var captureImage = document.createElement('i');
                        captureImage.setAttribute('class', 'mdi mdi-camera');
                        capture.appendChild(captureImage);

                        var changeBtn = document.createElement('span');
                        changeBtn.setAttribute("id", "main-change");
                        changeBtn.setAttribute("class", "btn");
                        
                        $('#video-dropzone-container').append(changeBtn);
                        var changeImage = document.createElement('i');
                        changeImage.setAttribute('class', 'fa fa-refresh');
                        changeBtn.appendChild(changeImage);

                        var _VIDEO = document.querySelector("#main-video");
                        
                        _VIDEO.addEventListener('loadedmetadata', function() { 
                            // Set canvas dimensions same as video dimensions
                            console.log('video size:'+_VIDEO.videoWidth+"-"+_VIDEO.videoHeight);
                            _CANVAS.width = _VIDEO.videoWidth;
                            _CANVAS.style.width = _VIDEO.videoWidth;
                            _CANVAS.height = _VIDEO.videoHeight;
                            _CANVAS.style.height = _VIDEO.videoHeight;
                        });

                        capture.addEventListener('click', function(){
                            console.log('abc');
                            _CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
                        
                            // document.querySelector("#get-thumbnail").setAttribute('href', _CANVAS.toDataURL());
                            // document.querySelector("#get-thumbnail").setAttribute('download', 'thumbnail.png');
                        });

                        changeBtn.addEventListener('click', function(){
                            if (editor != null) {
                                editor.parentNode.removeChild(editor);
                                Dropzone.forElement("#video-dropzone-container").removeAllFiles(true);
                                editor = null;
                            }
                        });
                    });
                }
            });
         
        //   $('.dropify').dropify();
          
        //   $('#treeview5').treeview({
        //     expandIcon: 'ti-angle-right',
        //     onhoverColor: "rgba(0, 0, 0, 0.05)",
        //     selectedBackColor: "#08bb44",
        //     collapseIcon: 'ti-angle-down',
        //     data: $scope.categoryTree
        //   });
        });
        // $(document).ready(function () {
        $('.img-container').imagesLoaded(function () {  

            setTimeout(function(){
                $('#LoadingLoop').hide();
            }, 500)
          })


        // })
    })
}]);