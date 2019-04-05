app.service('authService', ['$http', '$cookieStore', function ($http, $cookieStore) {
    const AUTH_ENDPOINT   = '/api/users/login';
    const LOGOUT_ENDPOINT = '/api/users/logout';
    const SIGNUP_ENDPOINT = '/api/users/register';
    var auth = {};

    auth.login = function(loginEmail, password) {
        return $http.post(AUTH_ENDPOINT, { loginEmail: loginEmail, password: password }).then(function(response, status) {
            if (response.data == null) return null;
            auth.user = response.data;
            $cookieStore.put('user', auth.user);
            return auth.user;
        });
    }

    auth.logout = function() {
        return $http.post(LOGOUT_ENDPOINT).then(function(response) {
            auth.user = undefined;

            $cookieStore.remove('user');

            $cookieStore.remove('currentUserId');
            $cookieStore.remove('currentTaskId');
            $cookieStore.remove('currentCookId');
            $cookieStore.remove('currentCleanId');
            $cookieStore.remove('currentWorkPlanReportId');
            $cookieStore.remove('currentWorkAssignId');
        });
    }

    auth.register = function(userObj) {
        return $http.post(SIGNUP_ENDPOINT, { user: userObj }).then(function(response, status) {
            console.log(response);
            if (!response.data.success) return null;
            auth.user = response.data;
            return auth.user;
        });
    }

    return auth;
}]);