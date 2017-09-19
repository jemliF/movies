moviesApp.service('ActorService', ['$http',
    function ($http) {
        var API_URL = 'http://localhost:4000/api/v1/actors/';

        this.create = function (actor) {
            return $http.post(API_URL, actor);
        };

        this.getAll = function () {
            return $http.get(API_URL);
        };
    }]);