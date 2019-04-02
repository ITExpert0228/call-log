app.controller('RankingCtrl', ['$scope', function($scope) {
    $scope.name = 'Products';
    $scope.$on('$viewContentLoaded', function(){

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