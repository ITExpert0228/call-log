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

        $("#myText").autocomplete({
            source: resData,
            minLength: 1,
            change: function() {
                // $("#myText").val("").css("display", 2);
            }
        });

        $("#enableComplete").click(function(){
            $('#myText').autocomplete('option', 'minLength', 0);
            $('#myText').autocomplete('search', $('#myText').val());
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

    $scope.save = function() {
        var $image = $('#jcrop_editor img');
        var cropper = $image.data('cropper');
        cropper.getCroppedCanvas().toBlob((blob) => {
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
                        mCategory: $scope.selectedCategory,
                        mImage: res,
                        mUser: $scope.loggedInUser.id
                    }
                    // if ($scope)
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
        }, "image/jpeg", 0.75);

        // console.log(cropper.getCroppedCanvas().toDataURL("image/jpeg", 0.7));
    }

    $scope.enableAutocomplete = function() {
        $('#myText').autocomplete('enable');
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
            
            var myDropzone = new Dropzone("#my-dropzone-container", {
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
                        $('#my-dropzone-container').append(editor);
                        editor.setAttribute("id", "jcrop_editor")
                        // Load the image
                        var image = new Image();
                        image.src = URL.createObjectURL(file);
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
                                Dropzone.forElement("#my-dropzone-container").removeAllFiles(true);
                                editor = null;
                            }
                        });
                    });
                }
            });
            
         
          $('.dropify').dropify();
          
          $('#treeview5').treeview({
            expandIcon: 'ti-angle-right',
            onhoverColor: "rgba(0, 0, 0, 0.05)",
            selectedBackColor: "#08bb44",
            collapseIcon: 'ti-angle-down',
            data: $scope.categoryTree
          });
        });
        // $(document).ready(function () {
        $('.img-container').imagesLoaded(function () {  
            
            // ----------------------------- Alert module
            var SweetAlert = function() {};
            //init
            $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
            // $.SweetAlert.init()

            setTimeout(function(){
                $('#LoadingLoop').hide();
            }, 500)
          })


        // })
    })
}]);