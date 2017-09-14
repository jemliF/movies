moviesApp.service('RatingService', ['$http', function ($http) {
    var API_URL = 'http://localhost:4000/api/v1/ratings/';

    this.create = function (rating) {
        return $http.post(API_URL, rating);
    };
    this.getAll = function () {
        return $http.get(API_URL);
    };

    this.get = function (id) {
        return $http.get(API_URL + id);
    };

    this.getAllBy = function (user, movie) {
        if (user && movie) {
            return $http.get(API_URL + '?user=' + user + '&movie=' + movie);
        } else if (movie) {
            return $http.get(API_URL + '?movie=' + movie);
        } else if (user) {
            return $http.get(API_URL + '?user=' + user);
        } else {
            return $http.get(API_URL);
        }
    };

}]);