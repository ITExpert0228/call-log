app.controller('MManageCtrl', ['$scope', 'categoryService', 'mediaService', '$cookieStore', '$filter', function($scope, categoryService, mediaService, $cookieStore, $filter) {

    $scope.allMedia = [];
    $scope.storeAll = [];
    $scope.loggedInUser = $cookieStore.get("user");
    $scope.filterType = 3;
    $scope.canShowBreadcrumb = false;
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthCNames = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    $scope.breadObj;

    $scope.getGroups = function () {
        var groupArray = [];
        angular.forEach($scope.allMedia, function (item, idx) {
            if (groupArray.indexOf(item.mMonth + ' ' + item.mYear) == -1) {
                groupArray.push(item.mMonth + ' ' + item.mYear);
            }
        });
        return groupArray;
    }
        
    mediaService.getAll().then(function(data){
        var mediaTxt = [];
        angular.forEach(data, function (media) {
            var date = new Date(media.mCreate);
            media.mYear = date.getFullYear();
            media.mMonth = monthNames[date.getMonth()];
            media.mCMonth = monthCNames[date.getMonth()];

            if (media.mUser == $scope.loggedInUser.id) {
                $scope.allMedia.push(media);
                mediaTxt.push(media.mName);
                $scope.storeAll.push(media);
            }
        });

        var	sArr = $filter('filter')($scope.allMedia, $scope.searchKey);
        var nArr = $filter('groupby')(sArr, $scope.getGroups()[0]);
    
        console.log(sArr);
        $scope.breadObj = {
            year: nArr[0].mYear,
            month: nArr[0].mCMonth,
            name: nArr[0].mName
        }

        $("#myText").autocomplete({
            source: mediaTxt,
            minLength: 1,
            change: function() {
                // $("#myText").val("").css("display", 2);
            }
        });

        $("#enableComplete").click(function(){
            
        });
    }, function (err) {
        console.log(err)
    }) 

    $scope.breadObj;
    $scope.updateSearch = function() {
        $scope.allMedia = [];
        
        angular.forEach($scope.storeAll, function (media) {
            var date = new Date(media.mCreate);
            media.mYear = date.getFullYear();
            media.mMonth = monthNames[date.getMonth()];
            media.mCMonth = monthNames[date.getMonth()];
            if (media.mName.search($scope.searchKey) >= 0) {
                $scope.allMedia.push(media);
            }
        });
        if ($scope.allMedia.length > 0) {
            $scope.canShowBreadcrumb = true;
            $scope.breadObj = {
                year: $scope.allMedia[0].mYear,
                month: $scope.allMedia[0].mCMonth,
                name: $scope.allMedia[0].mName
            }
        }
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
                        $scope.filterType = 1;
                        break;
                    case 'opt2':
                        $scope.filterType = 2;
                        break;
                    case 'opt3':
                        $scope.filterType = 3;
                        break;
                    case 'opt4':
                        $scope.filterType = 4;
                        break;
                    default:
                        $scope.filterType = 5;
                }
                $scope.updateSearch();
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