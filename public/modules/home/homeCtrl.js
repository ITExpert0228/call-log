app.controller('HomeCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.name = 'Homepage';

    $scope.voting1 = function(){
        $location.path('/voting/5cacfe0f1071b942d8108b1a')
    }

    $scope.voting2 = function(){
        $location.path('/voting/5cacfe0f1071b942d8108b1b')
    }

    $scope.voting3 = function(){
        $location.path('/voting/5cacfe0f1071b942d8108b1c')
    }

    $scope.searchRanking = function(e) {
        if (e == null || e.keyCode === 13) {
            $location.path('/ranking/s/'+ $scope.searchKey);
        }
    }

    $scope.goRanking = function(d) {
        if (d == 1) {
            $location.path('/ranking/d/5cacfe0f1071b942d8108b1b');
        } else if (d == 2) {
            $location.path('/ranking/d/5cacfe0f1071b942d8108b1c');
        } else {
            $location.path('/ranking/d/5cacfe0f1071b942d8108b1a');
        }
    }

    $scope.$on('$viewContentLoaded', function(){
        //Here your view content is fully loaded !!
        var tpj = jQuery;

        var revapi1014;
        tpj(document).ready(function () {
        if (tpj("#rev_slider_1014_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_1014_1");
        } else {
            revapi1014 = tpj("#rev_slider_1014_1").show().revolution({
            sliderType: "standard",
            jsFileLocation: "revolution/js/",
            sliderLayout: "fullscreen",
            dottedOverlay: "none",
            delay: 9000,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                mouseScrollReverse: "default",
                onHoverStop: "off",
                touch: {
                touchenabled: "on",
                swipe_threshold: 75,
                swipe_min_touches: 1,
                swipe_direction: "horizontal",
                drag_block_vertical: false
                },
                arrows: {
                style: "hermes",
                enable: true,
                hide_onmobile: true,
                hide_under: 768,
                hide_onleave: false,
                tmp: '<div class="tp-arr-allwrapper"><div class="tp-arr-imgholder"></div><div class="tp-arr-titleholder">{{title}}</div></div>',
                left: {
                    h_align: "left",
                    v_align: "center",
                    h_offset: 0,
                    v_offset: 0
                },
                right: {
                    h_align: "right",
                    v_align: "center",
                    h_offset: 0,
                    v_offset: 0
                }
                }
            },
            responsiveLevels:[1240,1024,778,778],
            gridwidth:[1240,1024,778,480],
            gridheight:[600,500,400,300],
            lazyType: 'smart',
            scrolleffect: {
                fade: "on",
                grayscale: "on",
                on_slidebg: "on",
                on_parallax_layers: "on",
                direction: "top",
                multiplicator_layers: "1.4",
                tilt: "10",
                disable_on_mobile: "off",
            },
            parallax: {
                type: "scroll",
                origo: "slidercenter",
                speed: 400,
                levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
            },
            shadow: 0,
            spinner: "off",
            stopLoop: 'off',
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            fullScreenAutoWidth: "off",
            fullScreenAlignForce: "off",
            fullScreenOffsetContainer: "",
            fullScreenOffset: "0px",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener: false,
            }
            });
        }

        });
    });
}]);