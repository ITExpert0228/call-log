app.controller('AuthCtrl', ['$scope', '$rootScope', '$cookieStore', '$location', 'authService', function($scope, $rootScope, $cookieStore, $location, authService) {
    $scope.name = 'Authpage';

    $scope.login = function() {
        $scope.isLogin = true;
        if (!$scope.credentials.loginEmail || !$scope.credentials.password) return;

        $('#LoadingLoop').show();
        authService.login($scope.credentials.loginEmail, $scope.credentials.password).then(function(data) {
            $('#LoadingLoop').hide();
            $cookieStore.put('remember_me', $scope.remember_me);
            if ($scope.remember_me) {
                $cookieStore.put('loginEmail', $scope.credentials.loginEmail);
                $cookieStore.put('password', $scope.credentials.password);
            }
            $rootScope.currentUser = data;

                // if (!data.token) {
                //     userService.updateToken(data.id).then(function (response) {
            if (data.role == 'admin') window.location.href = '/admin';
            else window.location.href = '/manager';
                //     });
                // } else {
                //     if (data.role == 'administrator') $state.go('home.dashboard');
                //     else $state.go('home.profile.info');
                // }


        }, function(err) {
            console.log(err);
            $scope.invalidLogin = true;

            if (!err.data || err.data == null)
                $scope.errMessage =  'Can not reach server!';
            else {
                $scope.errMessage = err.statusText;
                if (err.data == "INCORRECT_PASSWORD") {
                    $('#materialLoginFormPassword').addClass('is-invalid');
                } else if (err.data == "USER_NOT_EXISTS") {
                    $('#materialLoginFormEmail').addClass('is-invalid');
                }
            }
                
            $('#LoadingLoop').hide();
        }).finally(function() {
            $('#LoadingLoop').hide();
        });
    }

    $scope.register = function() {
        if ($scope.password != $scope.confirm_password) {
            $('#materialRegisterFormPasswordConfirm').addClass('is-invalid');
            return;
        }
        var userObj = {
            firstName:$scope.firstName,
            lastName:$scope.lastName,
            loginEmail:$scope.loginEmail,
            password:$scope.password,
            gender:parseInt($('#dropdown').val()),
            birthday:$scope.birthday,
            role: "user",
            country:$scope.country,
            city:$scope.city,
            job:$scope.job
        };
        
        $('#LoadingLoop').show();
        authService.register(userObj).then(function(data) {

            console.log(data);
            $scope.invalidRegister = false;
            $scope.errMessage = '';
            $scope.isSuccess = true;

            $location.path("/login");
            $('#LoadingLoop').hide();
        }, function(err) {
            $scope.invalidRegister = true;
            console.log(err);
            if (!err.data || err.data == null)
                $scope.errMessage = "Couldn't connect server";
            else if (err.data == "DUPLICATED") {
                $('#materialRegisterFormEmail').addClass('is-invalid');
            }
            $('#LoadingLoop').hide();
        }).finally(function() {
            $('#LoadingLoop').hide();
        });
    }

    // $scope.realCheck = function() {
    //     if ($('#materialRegisterFormPassword').val() != $('materialRegisterFormPasswordConfirm').val()) $('#materialRegisterFormPasswordConfirm').addClass('is-invalid');
    //     else $('#materialRegisterFormPasswordConfirm').removeClass('is-invalid');
    // }

    $scope.initLoginVariables = function() {
        $scope.isLogin = true;
        $scope.invalidLogin = false;
        if ($cookieStore.get('remember_me'))
            $scope.remember_me = $cookieStore.get('remember_me');

        if ($cookieStore.get('loginName')) {
            $scope.credentials = {};
            $scope.credentials.loginName = $cookieStore.get('loginName');
            $('.preneed').addClass('active');
        }
        if ($cookieStore.get('password')) {
            if (!$scope.credentials.loginName)
                $scope.credentials = {};
            $scope.credentials.password = $cookieStore.get('password');
        }
    }

    $scope.initRegisterVariables = function() {
        $scope.invalidRegister = false;
        $scope.isSuccess = false;
    }

    $scope.$on('$viewContentLoaded', function(){
        $('#datepicker').datepicker({
            showOtherMonths: true
        });
    
        $('#dropdown').dropdown();
    })
}]);