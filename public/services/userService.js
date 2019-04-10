app.service('userService', ['$http', '$cookieStore', function ($http, $cookieStore) {
    const USER_ENDPOINT   = '/api/users';
    var user = {};

    user.getUsers = function() {
        return $http.get(USER_ENDPOINT).then(function(response, status) {
            if (response.data == null) return null;
            return response.data;
        });
    }

    return user;
}]);