app.controller('VoteCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'optioService', 'voteService', function($scope, $rootScope, $location, $routeParams, optioService, voteService) {
    $scope.name = 'Votepage';
	$('#LoadingLoop').show();
    $scope.param = $routeParams.param;

    $scope.voteList = {};
    

    $scope.init = function(refresh) {
        optioService.getOptio($scope.param).then(function(data){
        
            voteService.getVote($scope.param).then(function(data){
                angular.forEach(data, function (vote) {
                    if ($scope.voteList[vote.vKey] == null) $scope.voteList[vote.vKey] = [];
                    $scope.voteList[vote.vKey].push(vote);
                });
    
                $scope.percentage_yes = $scope.getVotePercentage('yes');
                $scope.percentage_love = $scope.getVotePercentage('love');
                $scope.percentage_good = $scope.getVotePercentage('good');
                $scope.percentage_smart = $scope.getVotePercentage('smart');
    
                if (refresh) {
                    // setTimeout(function(){
                        $scope.animateProgress('.type-yes', $scope.percentage_yes);
                        $scope.animateProgress('.type-love', $scope.percentage_love);
                        $scope.animateProgress('.type-good', $scope.percentage_good);
                        $scope.animateProgress('.type-smart', $scope.percentage_smart);
                    // }, 700);
                } else {
                    setTimeout(function(){
                        $scope.animateProgress('.type-yes', $scope.percentage_yes);
                    }, 700);
                }
                console.log($scope.percentage_yes);
            }, function(err) {
                console.log(err);
            });
    
            $scope.optio = data;
            console.log(data);
        }, function (err) {
            console.log(err)
        });
    }

    $scope.init();

    $scope.getVotePercentage = function(key) {
        var tmpArr = $scope.voteList[key];
        if (tmpArr == null) return 50;
        var left = 0;
        var right = 0;
        for (var i=0; i<tmpArr.length; i++) {
            if (tmpArr[i].vMedia == $scope.optio.oLMedia.id) {
                if (tmpArr[i].vValue == true) left ++;
                else right ++; 
            } else {
                if (tmpArr[i].vValue == true) right ++;
                else left ++; 
            }
        }

        return Math.round(left / (left + right) *100); 
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

            $scope.animateProgress('.type-love', $scope.percentage_love);
            $scope.animateProgress('.type-good', $scope.percentage_good);
            $scope.animateProgress('.type-smart', $scope.percentage_smart);
        }
    }

    $scope.animateProgress = function (id, percentage) {
        if (percentage > 80) {
            $(id+ " span.float-right").hide();
            $(id+ " span.float-left").show();
        } else if (percentage < 20) {
            $(id+ " span.float-right").show();
            $(id+ " span.float-left").hide();
        }

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

    $scope.showStatistic = function($event, team) {
        $event.stopPropagation();
        $event.preventDefault();
        if (team == 1) {
            if ($('.team-b').hasClass('active')) {
                $('.team-b').animate({
                    width: "50%"
                });
                $('.team-b').removeClass('active');
                $('.team-a').fadeIn('show');
                $('.vote-status-bar').fadeIn();
                $('.statistic-bar').fadeOut();
                $('.team-details').fadeIn();
                $('.vs-d').fadeIn();
            } else {
                $('.team-b').animate({
                    width: "100%"
                });
                $('.team-b').addClass('active');
                $('.team-a').fadeOut('slow');
                $('.vote-status-bar').fadeOut();
                $('.statistic-bar').fadeIn();
                $('.team-details').fadeOut();
                $('.vs-d').fadeOut();

                $scope.showChat(team);
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
                $('.statistic-bar').fadeOut();
                $('.team-details').fadeIn();
                $('.vs-d').fadeIn();
            } else {
                $('.team-a').animate({
                    width: "100%"
                });
                $('.team-a').addClass('active');
                $('.team-b').fadeOut('slow');
                $('.vote-status-bar').fadeOut();
                $('.statistic-bar').fadeIn();
                $('.team-details').fadeOut();
                $('.vs-d').fadeOut();

                $scope.showChat(team);
            }
            $scope.selectedMedia = $scope.optio.oLMedia;
        }
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
                $('.statistic-bar').fadeOut();
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
                $('.statistic-bar').fadeOut();
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

    $scope.showChat = function (team) {
        var data1, data2, data3, data4;

        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            if (team == 0) {
                data1 = google.visualization.arrayToDataTable([
                    ['Language', 'Speakers (in millions)'],
                    ['Yes',  $scope.percentage_yes],
                    ['No',  100-$scope.percentage_yes]
                    ]);
                data2 = google.visualization.arrayToDataTable([
                    ['Language', 'Speakers (in millions)'],
                    ['Love',  $scope.percentage_love],
                    ['Hate',  100-$scope.percentage_love]
                    ]);
                data3 = google.visualization.arrayToDataTable([
                    ['Language', 'Speakers (in millions)'],
                    ['Good',  $scope.percentage_good],
                    ['Bad',  100-$scope.percentage_good]
                    ]);
                data4 = google.visualization.arrayToDataTable([
                    ['Language', 'Speakers (in millions)'],
                    ['Smart',  $scope.percentage_smart],
                    ['Dumb',  100-$scope.percentage_smart]
                    ]);
            } else {
                data1 = google.visualization.arrayToDataTable([
                    ['Language', 'Speakers (in millions)'],
                    ['No',  $scope.percentage_yes],
                    ['Yes',  100-$scope.percentage_yes]
                    ]);
                data2 = google.visualization.arrayToDataTable([
                    ['Language', 'Speakers (in millions)'],
                    ['Hate',  $scope.percentage_love],
                    ['Love',  100-$scope.percentage_love]
                    ]);
                data3 = google.visualization.arrayToDataTable([
                    ['Language', 'Speakers (in millions)'],
                    ['Bad',  $scope.percentage_good],
                    ['Good',  100-$scope.percentage_good]
                    ]);
                data4 = google.visualization.arrayToDataTable([
                    ['Language', 'Speakers (in millions)'],
                    ['Dumb',  $scope.percentage_smart],
                    ['Smart',  100-$scope.percentage_smart]
                    ]);
            }
            var options = {
                legend: 'none',
                pieSliceText: 'label',
                backgroundColor: 'transparent'
                // pieStartAngle: 100,
            };

            var chart1 = new google.visualization.PieChart(document.getElementById('chart1'));
            chart1.draw(data1, options);
            var chart2 = new google.visualization.PieChart(document.getElementById('chart2'));
            chart2.draw(data2, options);
            var chart3 = new google.visualization.PieChart(document.getElementById('chart3'));
            chart3.draw(data3, options);
            var chart4 = new google.visualization.PieChart(document.getElementById('chart4'));
            chart4.draw(data4, options);
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
            $scope.init(true);
        });
    }
}]);
