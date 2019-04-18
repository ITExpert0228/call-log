app.service('categoryService', ['$http', '$cookieStore', function ($http, $cookieStore) {
    const CATEGORY_ENDPOINT   = '/api/category';
    const CATEGORY_NEW_ENDPOINT   = '/api/category/create';
    var category = {};

    category.getAll = function() {
        return $http.get(CATEGORY_ENDPOINT).then(function(response, status) {
            // console.log(response);
            if (response.data == null) return null;
            return response.data;
        });
    }

    category.create = function(categoryObj) {
        return $http.post(CATEGORY_NEW_ENDPOINT, { category: categoryObj }).then(function(response, status) {
            // console.log(response);
            if (!response.data) return null;
            return response.data;
        });
    }

    return category;
}]);