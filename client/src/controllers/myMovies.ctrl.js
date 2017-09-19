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
                    if (err.data.message) {
                        alert(err.data.message);
                    }
                });
        };

        $scope.fetchMovies = function () {
            getMovies();
        };

        getMovies();

        $rootScope.$on('movieDeleted', function (evt, movieId) {
            $scope.movies = $scope.movies.filter(function (movie) {
                return movie._id !== movieId;
            });
        });
    }]);