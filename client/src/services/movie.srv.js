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

    this.getAllBy = function (sortField, sortSense, user, movie) {
        var url = API_URL;
        if (sortSense || sortField || user || movie) {
            url += '?';
            sortField ? url += '?sortBy=' + sortField : '';
            sortSense ? url += '?sortSense=' + sortSense : '';
            movie ? url += '?movie=' + movie : '';
            user ? url += '?user=' + user : '';
            return $http.get(url);
        }
    };


    this.delete = function (id) {
        return $http.delete(API_URL + id);
    };

    this.update = function (id, update) {
        return $http.put(API_URL + id, update);
    };
}]);