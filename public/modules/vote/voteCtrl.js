app.controller('VoteCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'optioService', 'voteService', function($scope, $rootScope, $location, $routeParams, optioService, voteService) {
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

    $scope.voteSelect = function(team) {
        if (team == 1) {
            if ($('.team-b').hasClass('active')) {
                $('.team-b').animate({
                    width: "50%"
                });
                $('.team-b').removeClass('active');
                $('.team-a').fadeIn('show');
                $('.vote-status-bar').fadeIn();
                $('.vote-bar').fadeOut();
                $('.team-details').fadeIn();
                $('.vs-d').fadeIn();
            } else {
                $('.team-b').animate({
                    width: "100%"
                });
                $('.team-b').addClass('active');
                $('.team-a').fadeOut('slow');
                $('.vote-status-bar').fadeOut();
                $('.vote-bar').fadeIn();
                $('.team-details').fadeOut();
                $('.vs-d').fadeOut();
            }
            $scope.selectedMedia = $scope.optio.oRMedia;
        } else {
            if ($('.team-a').hasClass('active')) {
                $('.team-a').animate({
                    width: "50%"
                });
                $('.team-a').removeClass('active');
                $('.team-b').fadeIn('show');
                $('.vote-status-bar').fadeIn();
                $('.vote-bar').fadeOut();
                $('.team-details').fadeIn();
                $('.vs-d').fadeIn();
            } else {
                $('.team-a').animate({
                    width: "100%"
                });
                $('.team-a').addClass('active');
                $('.team-b').fadeOut('slow');
                $('.vote-status-bar').fadeOut();
                $('.vote-bar').fadeIn();
                $('.team-details').fadeOut();
                $('.vs-d').fadeOut();
            }
            $scope.selectedMedia = $scope.optio.oLMedia;
        }
    }

    $scope.$on('$viewContentLoaded', function(){
 		setTimeout(function(){
            $('#LoadingLoop').hide();
        }, 500);
    });

    $scope.vote = function(type, value) {
        console.log(type+'::'+value);
        var voteObj = {
            vOptio: $scope.optio.id,
            vMedia: $scope.selectedMedia.id,
            vKey: type,
            vValue: value,
            vUser: $rootScope.currentUser
        }

        voteService.create(voteObj).then(function(data){
            console.log(data);
            if ($('.team-b').hasClass('active')) $scope.voteSelect(1);
            else $scope.voteSelect(0);
        });
    }
}]);
