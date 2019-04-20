app.controller('RankingCtrl', ['$scope', 'categoryService', 'mediaService', 'optioService', '$cookieStore', '$filter', '$routeParams', function($scope, categoryService, mediaService, optioService, $cookieStore, $filter, $routeParams) {

    $scope.currentCategory = null;
    $scope.includeCategoryIDs = [];
    $scope.categorys = [];
    $scope.allOptio = [];
    $scope.categoryOptio = [];
    $scope.routes = [];
    
    categoryService.getAll().then(function(data){
        angular.forEach(data, function (category) {
            if ($routeParams.type == 's' && $routeParams.param != null) {
                if (category.cName.toLowerCase().search($routeParams.param.toLowerCase()) > -1) {
                    category.href = '/ranking/'+category.id;
                    $scope.categorys.push(category);        
                }
            } else if ($routeParams.type == 'd' && $routeParams.param != null) {
                console.log('aaa');
                if ($routeParams.param == category.id) {
                    $scope.currentCategory = category;
                    $scope.includeCategoryIDs.push(category.id);
                    for (var i=0; i<data.length; i++) {
                        var tmp = data[i];
                        if (tmp.cParent != null && tmp.cParent == category.id) $scope.includeCategoryIDs.push(tmp.id);
                        if (tmp.id == category.cParent) $scope.routes.push(tmp);
                    }
                    console.log($scope.currentCategory);
                }
            } else {
                if ($routeParams.param == category.cParent) {
                    // category.width = $scope.getRandomInt(180, 250);
                    category.href = '/ranking/'+category.id;
                    // category.height = $scope.getRandomInt(250, 350);    
                    $scope.categorys.push(category);
                } else if ($routeParams.param == category.id) {
                    category.cFName = "Most Voted Optios in "+category.cName;
                    $scope.currentCategory = category;
                    $scope.includeCategoryIDs.push(category.id);
                    for (var i=0; i<data.length; i++) {
                        var tmp = data[i];
                        if (tmp.cParent != null && tmp.cParent == category.id) $scope.includeCategoryIDs.push(tmp.id);
                        if (tmp.id == category.cParent) $scope.routes.push(tmp);
                    }
                }
            } 
        });

        optioService.getAll().then(function(data){
            angular.forEach(data, function (optio) {
                $scope.allOptio.push(optio);
                if ($routeParams.param != null) {
                    for (var i=0; i<$scope.includeCategoryIDs.length; i++) {
                        if (optio.oLMedia.mCategory == $scope.includeCategoryIDs[i] || optio.oRMedia.mCategory == $scope.includeCategoryIDs[i]) {
                            $scope.categoryOptio.push(optio);
                            break;
                        }
                    }
                    
                } else $scope.categoryOptio.push(optio);
                
            });

            if ($scope.currentCategory != null && $scope.categorys.length == 0) {

            }
        }, function (err) {
            console.log(err)
        });
        
    }, function (err) {
        console.log(err)
    });

    $scope.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $scope.$on('$viewContentLoaded', function(){
        if ($('body').hasClass('mobile-nav-active')) {
          $('.mobile-nav-toggle').trigger('click');
        }

        $('.portfolio-container').imagesLoaded(function () {
            var portfolioIsotope = $('.portfolio-container').isotope({
              itemSelector: '.portfolio-item'
            });
            $('#portfolio-flters li').on( 'click', function() {
              $("#portfolio-flters li").removeClass('filter-active');
              $(this).addClass('filter-active');
          
              portfolioIsotope.isotope({ filter: $(this).data('filter') });
            });
        });
          
    });
}]);