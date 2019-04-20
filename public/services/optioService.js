app.service('optioService', ['$http', '$cookieStore', function ($http, $cookieStore) {
    const OPTIO_ENDPOINT   = '/api/optio';
    const OPTIO_NEW_ENDPOINT   = '/api/optio/create';
    var optio = {};

    optio.getAll = function() {
        return $http.get(OPTIO_ENDPOINT).then(function(response, status) {
            if (response.data == null) return null;
            return response.data;
        });
    }

    optio.getOptio = function(id) {
        return $http.get(OPTIO_ENDPOINT+'/'+id).then(function(response, status) {
            if (response.data == null) return null;
            return response.data;
        });
    }

    optio.create = function(optioObj) {
        return $http.post(OPTIO_NEW_ENDPOINT, { optio: optioObj }).then(function(response, status) {
            // console.log(response);
            if (!response.data) return null;
            return response.data;
        });
    }

    return optio;
}]);