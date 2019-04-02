app.service('authService', ['$cookieStore', function ($cookieStore) {
    var auth = {};
    auth.login = function(loginName, password) {
        
        auth.user = {
            email: 'rha11@hotmail.com'
        }
        $cookieStore.put('user', auth.user);
        console.log('service run');
        return auth.user;
        // return $http.post(AUTH_ENDPOINT, { loginName: loginName, password: password }).then(function(response, status) {
        //     if (!response.data.success) return null;
        //     auth.user = response.data.message;
        //     $cookieStore.put('user', auth.user);
        //     return auth.user;
        // });
    }
    return auth;
}]);