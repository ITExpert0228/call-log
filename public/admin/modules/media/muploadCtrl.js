app.controller('MUploadCtrl', ['$scope', 'categoryService', 'mediaService', '$cookieStore', '$routeParams', function($scope, categoryService, mediaService, $cookieStore, $routeParams) {

    $scope.newCat = false;
    $scope.categorys = [];
    var cropperObj;
    $scope.loggedInUser = $cookieStore.get("user");

    categoryService.getAll().then(function(data){
        console.log(data);
        $scope.categorys = data;
        $scope.categorys.push({id:'null', cName:'Create a Category'})
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
        if (!$scope.selectedImg) $scope.selectedImg = 'admin/assets/images/select.jpg';

        console.log($scope.selectedImg);
        // $scope.toDataURL($scope.selectedImg, function(dataUrl) {
        //   $('#inputImage').val(dataUrl)
        // });
        $('#inputImage').trigger('change');

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

    $scope.categoryChanged = function() {
        if ($scope.selectedCategory == 'null') $scope.newCat = true;
    }

    $scope.saveCategory = function() {
        var categoryObj = {
            cName: $scope.newModel
        }

        // $('#LoadingLoop').show();
        categoryService.create(categoryObj).then(function(newCategory) {
            categoryService.getAll().then(function(data){
                // $('#LoadingLoop').hide();
                $scope.newCat = false;
                $scope.categorys = data;
                $scope.categorys.push({id:'null', cName:'Create a Category'});
                $scope.selectedCategory = newCategory.id;
            }, function (err) {
                // $('#LoadingLoop').hide();
                console.log(err)
            });
            
        }, function (err) {
            // $('#LoadingLoop').hide();
            console.log(err);
        })
    }

    $scope.createCancel = function() {
        $scope.newCat = false;
        $scope.selectedCategory = '';
    }

    $scope.save = function() {
        var $image = $('#image');
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
                        mImage: res.path,
                        mUser: $scope.loggedInUser.id
                    }
                    // if ($scope)
                    mediaService.create(mediaObj).then(function(newMedia){
                        swal({   
                            title: "Media Successfully Uploaded!",   
                            text: "Recently joined twitter",   
                            imageUrl: newMedia.mImage.replace('\\', '/'),
                            timer: 1000,   
                        });
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
        $(document).ready(function () {

            var $image = $('#image');
            var $download = $('#download');
            var $dataX = $('#dataX');
            var $dataY = $('#dataY');
            var $dataHeight = $('#dataHeight');
            var $dataWidth = $('#dataWidth');
            var $dataRotate = $('#dataRotate');
            var $dataScaleX = $('#dataScaleX');
            var $dataScaleY = $('#dataScaleY');
            var options = {
                  aspectRatio: 1 / 1,
                  preview: '.img-preview',
                  crop: function (e) {
                    $dataX.val(Math.round(e.x));
                    $dataY.val(Math.round(e.y));
                    $dataHeight.val(Math.round(e.height));
                    $dataWidth.val(Math.round(e.width));
                    $dataRotate.val(e.rotate);
                    $dataScaleX.val(e.scaleX);
                    $dataScaleY.val(e.scaleY);
                  }
                };
          
            // Tooltip
            $('[data-toggle="tooltip"]').tooltip();
          
          
            // Cropper
            cropperObj = $image.on({
              'build.cropper': function (e) {
                console.log(e.type);
              },
              'built.cropper': function (e) {
                console.log(e.type);
              },
              'cropstart.cropper': function (e) {
                console.log(e.type, e.action);
              },
              'cropmove.cropper': function (e) {
                console.log(e.type, e.action);
              },
              'cropend.cropper': function (e) {
                console.log(e.type, e.action);
              },
              'crop.cropper': function (e) {
                console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
              },
              'zoom.cropper': function (e) {
                console.log(e.type, e.ratio);
              }
            }).cropper(options);
          
          
            // Buttons
            if (!$.isFunction(document.createElement('canvas').getContext)) {
              $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
            }
          
            if (typeof document.createElement('cropper').style.transition === 'undefined') {
              $('button[data-method="rotate"]').prop('disabled', true);
              $('button[data-method="scale"]').prop('disabled', true);
            }
          
            // Options
            $('.docs-toggles').on('change', 'input', function () {
              var $this = $(this);
              var name = $this.attr('name');
              var type = $this.prop('type');
              var cropBoxData;
              var canvasData;
          
              if (!$image.data('cropper')) {
                return;
              }
          
              if (type === 'checkbox') {
                options[name] = $this.prop('checked');
                cropBoxData = $image.cropper('getCropBoxData');
                canvasData = $image.cropper('getCanvasData');
          
                options.built = function () {
                  $image.cropper('setCropBoxData', cropBoxData);
                  $image.cropper('setCanvasData', canvasData);
                };
              } else if (type === 'radio') {
                options[name] = $this.val();
              }
          
              cropperObj = $image.cropper('destroy').cropper(options);
            });
          
          
            // Methods
            $('.docs-buttons').on('click', '[data-method]', function () {
              var $this = $(this);
              var data = $this.data();
              var $target;
              var result;
          
              if ($this.prop('disabled') || $this.hasClass('disabled')) {
                return;
              }
          
              if ($image.data('cropper') && data.method) {
                data = $.extend({}, data); // Clone a new one
          
                if (typeof data.target !== 'undefined') {
                  $target = $(data.target);
          
                  if (typeof data.option === 'undefined') {
                    try {
                      data.option = JSON.parse($target.val());
                    } catch (e) {
                      console.log(e.message);
                    }
                  }
                }
          
                if (data.method === 'rotate') {
                  $image.cropper('clear');
                }
          
                result = $image.cropper(data.method, data.option, data.secondOption);
          
                if (data.method === 'rotate') {
                  $image.cropper('crop');
                }
          
                switch (data.method) {
                  case 'scaleX':
                  case 'scaleY':
                    $(this).data('option', -data.option);
                    break;
          
                  case 'getCroppedCanvas':
                    if (result) {
          
                      // Bootstrap's Modal
                      $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
          
                      if (!$download.hasClass('disabled')) {
                        $download.attr('href', result.toDataURL('image/jpeg'));
                      }
                    }
          
                    break;
                }
          
                if ($.isPlainObject(result) && $target) {
                  try {
                    $target.val(JSON.stringify(result));
                  } catch (e) {
                    console.log(e.message);
                  }
                }
          
              }
            });
          
          
            // Keyboard
            $(document.body).on('keydown', function (e) {
          
              if (!$image.data('cropper') || this.scrollTop > 300) {
                return;
              }
          
              switch (e.which) {
                case 37:
                  e.preventDefault();
                  $image.cropper('move', -1, 0);
                  break;
          
                case 38:
                  e.preventDefault();
                  $image.cropper('move', 0, -1);
                  break;
          
                case 39:
                  e.preventDefault();
                  $image.cropper('move', 1, 0);
                  break;
          
                case 40:
                  e.preventDefault();
                  $image.cropper('move', 0, 1);
                  break;
              }
          
            });
          
          
            // Import image
            var $inputImage = $('#inputImage');
            var URL = window.URL || window.webkitURL;
            var blobURL;
          
            if (URL) {
              $inputImage.on('select-change', function () {
                var files = this.files;
                var file;
          
                if (!$image.data('cropper')) {
                  return;
                }
          
                if (files && files.length) {
                  file = files[0];
          
                  if (/^image\/\w+$/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    $image.one('built.cropper', function () {
          
                      // Revoke when load complete
                      URL.revokeObjectURL(blobURL);
                    }).cropper('reset').cropper('replace', blobURL);
                    $inputImage.val('');
                  } else {
                    window.alert('Please choose an image file.');
                  }
                }
              });
            } else {
                console.log('aaa');
              $inputImage.prop('disabled', true).parent().addClass('disabled');
            }

            // }, 300);
            // ----------------------------- Alert module
            // var SweetAlert = function() {};
            //init
            // $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
            // $.SweetAlert.init()
          })


        // })
    })
}]);