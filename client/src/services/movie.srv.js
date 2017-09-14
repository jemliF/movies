moviesApp.service('MovieService', ['$http', function ($http) {
    var API_URL = 'http://localhost:4000/api/v1/movies/';

    this.create = function (movie) {
        return $http.post(API_URL, movie);
    };
    this.getAll = function () {
        return $http.get(API_URL);
    };

    this.get = function (id) {
        return $http.get(API_URL + id);
    };

    this.getAllBy = function (sortField, sortSense) {
        return $http.get(API_URL + '?sortBy=' + sortField + '&sortSense=' + sortSense);
    };

}]);