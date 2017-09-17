moviesApp.controller('MyMoviesController', ['$scope', 'UserService', 'MovieService', 'currentUser', '$rootScope',
    function ($scope, UserService, MovieService, currentUser, $rootScope) {
        $scope.filter = '';
        $scope.options = {
            editable: true
        };
        var getMovies = function () {
            MovieService.getAllBy(null, null, currentUser._id, null)
                .then(function (res) {
                    $scope.movies = res.data;
                }, function (err) {
                    console.error(err);
                });
        };

        $scope.fetchMovies = function () {
            getMovies();
            $cookies.put('moviesSortBy', $scope.sortField);
            $cookies.put('moviesSortSense', $scope.sortSense);
        };

        getMovies();

        $rootScope.$on('movieDeleted', function (evt, movieId) {
            console.log('movieDeleted');
            $scope.movies = $scope.movies.filter(function (movie) {
                return movie._id !== movieId;
            });
        });
    }]);