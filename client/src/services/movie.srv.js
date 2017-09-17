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
        url += '?' + 'sortBy=' + (sortField || 'createdAt');
        if (sortSense) {
            sortSense != null ? url += '&sortSense=' + sortSense : url += '&sortSense=' + 'desc';
        }
        if (movie) {
            movie != null ? url += '&movie=' + movie : null;
        }
        if (user) {
            user != null ? url += '&createdBy=' + user : null;
        }
        return $http.get(url);
    };


    this.delete = function (id) {
        return $http.delete(API_URL + id);
    };

    this.update = function (id, update) {
        return $http.put(API_URL + id, update);
    };
}]);