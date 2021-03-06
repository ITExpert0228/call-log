app.controller('MManageCtrl', ['$scope', 'categoryService', 'mediaService', '$cookieStore', '$filter', function($scope, categoryService, mediaService, $cookieStore, $filter) {

    $scope.allMedia = [];
    $scope.storeAll = [];
    $scope.loggedInUser = $cookieStore.get("user");
    $scope.filterType = 3;
    $scope.canShowBreadcrumb = false;
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthCNames = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    $scope.breadObj;

    // $scope.getGroups = function () {
    //     var groupArray = [];
    //     angular.forEach($scope.allMedia, function (item, idx) {
    //         if (groupArray.indexOf(item.mMonth + ' ' + item.mYear) == -1) {
    //             groupArray.push(item.mMonth + ' ' + item.mYear);
    //         }
    //     });
    //     return groupArray;
    // }

    $scope.searchMedia = [];
    $scope.groups = [];
        
    mediaService.getAll().then(function(data){
        var mediaTxt = [];
        console.log(data);
        angular.forEach(data, function (media) {
            var date = new Date(media.mCreate);
            media.mYear = date.getFullYear();
            media.mMonth = monthNames[date.getMonth()];
            // media.mCMonth = monthCNames[date.getMonth()];

            if (media.mUser == $scope.loggedInUser.id) {
                $scope.allMedia.push(media);
                $scope.searchMedia.push(media);
            }
        });

        $scope.search();
    }, function (err) {
        console.log(err)
    }) 

    $scope.search = function(selected_id) {
        console.log('aaaa');
        $scope.searchMedia = [];
        $scope.groups = [];
        if ($scope.searchTag == null) $scope.searchTag = '';
        var activeSelected = false;
        angular.forEach($scope.allMedia, function (media) {
            media.active = false;
            if (media.mName.toLowerCase().search($scope.searchTag.toLowerCase()) > -1) {
                media.filter = 'Others';
                if ($scope.filterType == 3 || $scope.filterType == 4) {

                } else if ($scope.filterType == 2) {
                    var date = new Date(media.mCreate);
                    media.mYear = date.getFullYear();
                    media.mMonth = monthNames[date.getMonth()];
                    var val = media.mMonth+' '+media.mYear;
                    if (!$scope.groups.includes(val)) $scope.groups.push(val);
                    media.filter = val;
                } else if ($scope.filterType == 1) {
                    console.log('a');
                    if (!$scope.groups.includes(media.mCategory.cName)) $scope.groups.push(media.mCategory.cName);
                    media.filter = media.mCategory.cName;
                } else {
                    // if (optio.oCategory && !$scope.groups.includes(optio.oCategory.cName)) {
                    //     $scope.groups.push(optio.oCategory.cName);
                    // }
                    // optio.filter = optio.oCategory?optio.oCategory.cName:'Others';
                }
                $scope.searchMedia.push(media);
            }
            // if (selected_id && selected_id == optio.id) {
            //     optio.active = true;
            //     activeSelected = true;
            //     for (var i=0; i<$scope.categorys.length; i++) {
            //         if (optio.oLMedia && $scope.categorys[i].id == optio.oLMedia.mCategory) {
            //             $scope.selectedCategory = $scope.categorys[i].cName;
            //             break;
            //         }
            //     }
            //     $scope.selectedTopic = optio.oCategory?optio.oCategory.cName:'No Topic';
            //     $scope.selectedOptioTitle = optio.oLMedia.mName + ' VS ' + optio.oRMedia.mName;

            //     voteService.getVoteRank(selected_id).then(function(data){
            //         $scope.rankingInfo = data
            //     }, function (err) {
            //         console.log(err)
            //     }) 
            // } else if (!selected_id && !optio.active && !activeSelected && optio.filter == $scope.groups[0]) {
            //     optio.active = true;
            //     activeSelected = true;
            //     for (var i=0; i<$scope.categorys.length; i++) {
            //         if (optio.oLMedia && $scope.categorys[i].id == optio.oLMedia.mCategory) {
            //             $scope.selectedCategory = $scope.categorys[i].cName;
            //             break;
            //         }
            //     }
            //     $scope.selectedTopic = optio.oCategory?optio.oCategory.cName:'No Topic';
            //     $scope.selectedOptioTitle = optio.oLMedia.mName + ' VS ' + optio.oRMedia.mName;
            //     voteService.getVoteRank(optio.id).then(function(data){
            //         $scope.rankingInfo = data
            //     }, function (err) {
            //         console.log(err)
            //     })
            // }
            
        });
        $scope.groups.push('Others');
        setTimeout(function() {
            $scope.$apply();
        }, 100);
    }

    $scope.$on('$viewContentLoaded', function(){
        function icheckfirstinit() {
            if (!$().iCheck) {
                return;
            }
        
            $('.check').each(function() {
                var ck = $(this).attr('data-checkbox') ? $(this).attr('data-checkbox') : 'icheckbox_minimal-red';
                var rd = $(this).attr('data-radio') ? $(this).attr('data-radio') : 'iradio_minimal-red';
        
                if (ck.indexOf('_line') > -1 || rd.indexOf('_line') > -1) {
                    $(this).iCheck({
                        checkboxClass: ck,
                        radioClass: rd,
                        insert: '<div class="icheck_line-icon"></div>' + $(this).attr("data-label")
                    });
                } else {
                    $(this).iCheck({
                        checkboxClass: ck,
                        radioClass: rd
                    });
                }
            });
        
            $('.skin-polaris input').iCheck({
                checkboxClass: 'icheckbox_polaris',
                radioClass: 'iradio_polaris'
            });
        
            $('.skin-futurico input').iCheck({
                checkboxClass: 'icheckbox_futurico',
                radioClass: 'iradio_futurico'
            });
        };
        
        var iCheckcontrol = function () {
            return {
                
                init: function () {  
        
                    $('.icolors li').click(function() {
                        var self = $(this);
        
                        if (!self.hasClass('active')) {
                            self.siblings().removeClass('active');
        
                            var skin = self.closest('.skin'),
                                c = self.attr('class') ? '-' + self.attr('class') : '',
                                ct = skin.data('color') ? '-' + skin.data('color') : '-red',
                                ct = (ct === '-black' ? '' : ct);
        
                                checkbox_default = 'icheckbox_minimal',
                                radio_default = 'iradio_minimal',
                                checkbox = 'icheckbox_minimal' + ct,
                                radio = 'iradio_minimal' + ct;
        
                            if (skin.hasClass('skin-square')) {
                                checkbox_default = 'icheckbox_square';
                                radio_default = 'iradio_square';
                                checkbox = 'icheckbox_square' + ct;
                                radio = 'iradio_square'  + ct;
                            };
        
                            if (skin.hasClass('skin-flat')) {
                                checkbox_default = 'icheckbox_flat';
                                radio_default = 'iradio_flat';
                                checkbox = 'icheckbox_flat' + ct;
                                radio = 'iradio_flat'  + ct;
                            };
        
                            if (skin.hasClass('skin-line')) {
                                checkbox_default = 'icheckbox_line';
                                radio_default = 'iradio_line';
                                checkbox = 'icheckbox_line' + ct;
                                radio = 'iradio_line'  + ct;
                            };
        
                            skin.find('.check').each(function() {
                                var e = $(this).hasClass('state') ? $(this) : $(this).parent();
                                var e_c = e.attr('class').replace(checkbox, checkbox_default + c).replace(radio, radio_default + c);
                                e.attr('class', e_c);
                            });
        
                            skin.data('color', self.attr('class') ? self.attr('class') : 'black');
                            self.addClass('active');
                        };
                    });
                }
            };
        }();  
        
        $(document).ready(function() {
            icheckfirstinit();
            iCheckcontrol.init();
            $('input').on('ifChecked', function(event){
                switch ($(this).data('dom')) {
                    case 'opt1':
                        $scope.filterType = 0;
                        break;
                    case 'opt2':
                        $scope.filterType = 1;
                        break;
                    case 'opt3':
                        $scope.filterType = 2;
                        break;
                    case 'opt4':
                        $scope.filterType = 3;
                        break;
                    default:
                        $scope.filterType = 4;
                }
                $scope.search();
            });
        })
        
    })
}]);

app.filter('groupby', function(){
    return function(items,group){       
       return items.filter(function(element, index, array) {
            return (element.mMonth + ' ' + element.mYear)==group;
        });        
    }        
}) ; 