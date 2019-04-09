app.service('mediaService', ['$http', '$cookieStore', function ($http, $cookieStore) {
    const MEDIA_ENDPOINT   = '/api/media';
    const MEDIA_NEW_ENDPOINT   = '/api/media/create';
    var media = {};

    media.getAll = function() {
        return $http.get(MEDIA_ENDPOINT).then(function(response, status) {
            if (response.data == null) return null;
            return response.data;
        });
    }

    media.create = function(mediaObj) {
        return $http.post(MEDIA_NEW_ENDPOINT, { media: mediaObj }).then(function(response, status) {
            console.log(response);
            if (!response.data) return null;
            return response.data;
        });
    }

    return media;
}]);