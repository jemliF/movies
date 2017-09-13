moviesApp.controller('HomeController', ['$scope', 'UserService', 'MovieService', function ($scope, UserService, MovieService) {
    MovieService.getAll()
        .then(function (res) {
            $scope.movies = res.data;
        }, function (err) {
            console.error(err);
        });
}]);