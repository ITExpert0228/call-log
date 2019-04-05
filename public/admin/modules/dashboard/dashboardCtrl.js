app.controller('DashboardCtrl', ['$scope', function($scope) {
    $scope.name = 'Dashboardpage';

    $scope.$on('$viewContentLoaded', function(){

$(function () {
    "use strict";
    var chart = new Chartist.Line('.campaign', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
                [0, 5000, 15000, 8000, 15000, 9000, 30000, 0]
                , [0, 3000, 5000, 2000, 8000, 1000, 5000, 0]
            ]}, {
            low: 0,
            high: 28000,
            showArea: true,
            fullWidth: true,
            plugins: [
                Chartist.plugins.tooltip()
            ],
                axisY: {
                onlyInteger: true
                , scaleMinSpace: 40    
                , offset: 20
                , labelInterpolationFnc: function (value) {
                    return (value / 1000) + 'k';
                }
            },
            });

            // Offset x1 a tiny amount so that the straight stroke gets a bounding box
            // Straight lines don't get a bounding box 
            // Last remark on -> http://www.w3.org/TR/SVG11/coords.html#ObjectBoundingBox
            chart.on('draw', function(ctx) {  
            if(ctx.type === 'area') {    
                ctx.element.attr({
                x1: ctx.x1 + 0.001
                });
            }
            });

            // Create the gradient definition on created event (always after chart re-render)
            chart.on('created', function(ctx) {
            var defs = ctx.svg.elem('defs');
            defs.elem('linearGradient', {
                id: 'gradient',
                x1: 0,
                y1: 1,
                x2: 0,
                y2: 0
            }).elem('stop', {
                offset: 0,
                'stop-color': 'rgba(255, 255, 255, 1)'
            }).parent().elem('stop', {
                offset: 1,
                'stop-color': 'rgba(38, 198, 218, 1)'
            });
            });
        
                
        var chart = [chart];

        // ============================================================== 
        // This is for the animation
        // ==============================================================
        
        for (var i = 0; i < chart.length; i++) {
            chart[i].on('draw', function(data) {
                if (data.type === 'line' || data.type === 'area') {
                    data.element.animate({
                        d: {
                            begin: 500 * data.index,
                            dur: 500,
                            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                            to: data.path.clone().stringify(),
                            easing: Chartist.Svg.Easing.easeInOutElastic
                        }
                    });
                }
                if (data.type === 'bar') {
                    data.element.animate({
                        y2: {
                            dur: 500,
                            from: data.y1,
                            to: data.y2,
                            easing: Chartist.Svg.Easing.easeInOutElastic
                        },
                        opacity: {
                            dur: 500,
                            from: 0,
                            to: 1,
                            easing: Chartist.Svg.Easing.easeInOutElastic
                        }
                    });
                }
            });
        }
        
  
    });


    })
}]);