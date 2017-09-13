moviesApp.service('UserService', ['$http', function ($http) {
    var API_URL = 'http://localhost:4000/api/v1/users/';

    this.create = function (user) {
        return $http.post(API_URL, user);
    }

    this.login = function (email, password) {
        return $http.post(API_URL + 'login', {email: email, password: password});
    }


}]);