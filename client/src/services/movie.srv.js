moviesApp.service('MovieService', ['$http', function ($http) {
    var API_URL = 'http://localhost:4000/api/v1/movies/';

    this.create = function (user) {
        return $http.post(API_URL, user);
    }
    this.getAll = function () {
        return $http.get(API_URL);
    }

    this.get = function (id) {
        return $http.get(API_URL + id);
    }


}]);