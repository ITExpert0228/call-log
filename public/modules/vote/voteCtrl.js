app.controller('VoteCtrl', ['$scope', '$location', '$routeParams', 'optioService', function($scope, $location, $routeParams, optioService) {
    $scope.name = 'Votepage';
	$('#LoadingLoop').show();
    $scope.param = $routeParams.param;
    optioService.getOptio($scope.param).then(function(data){
        
        data.percentage1 = $scope.getRandomPercentage();
        data.percentage2 = $scope.getRandomPercentage();
        data.percentage3 = $scope.getRandomPercentage();
        data.percentage4 = $scope.getRandomPercentage();
        $scope.optio = data;
        console.log(data);

        setTimeout(function(){
            $scope.animateProgress('.type-yes', $scope.optio.percentage1);
        }, 700);
    }, function (err) {
        console.log(err)
    });

    $scope.getRandomPercentage = function() {
        var min=20; 
        var max=70;  
        return Math.floor(Math.random() * (+max - +min)) + +min; 
    }

    $scope.toggleStatus = function() {
        if ($('.vote-status-bar').hasClass('active')) {
            $(".vote-status-bar").animate({
                height: "128px"
            }, {
                duration: 700,
                easing: "swing",
            });
            $('.vote-status-bar').removeClass('active');
            $('#additional-options').fadeOut('slow');
        } else {
            $(".vote-status-bar").animate({
                height: "450px"
            }, {
                duration: 700,
                easing: "swing",
            });
            $('.vote-status-bar').addClass('active');
            $('#additional-options').fadeIn('slow');

            $scope.animateProgress('.type-love', $scope.optio.percentage2);
            $scope.animateProgress('.type-good', $scope.optio.percentage3);
            $scope.animateProgress('.type-smart', $scope.optio.percentage4);
        }
    }

    $scope.animateProgress = function (id, percentage) {
        $(id+ " div.bg-success").animate({
            width: percentage + "%"
        }, {
            duration: 700,
            easing: "swing",
            step: function(x) {
                $(id+" div.bg-success").html(Math.round(x)  + "%");  
            }
        });
        $(id+" div.bg-danger").animate({
            width: (100-percentage) + "%"
        }, {
            duration: 700,
            easing: "swing",
            step: function(x) {
                $(id+" div.bg-danger").html(Math.round(x)  + "%");  
            }
        });
    }

    $scope.$on('$viewContentLoaded', function(){
 		setTimeout(function(){
            $('#LoadingLoop').hide();
        }, 500);
    });

    
}]);
