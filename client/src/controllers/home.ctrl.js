moviesApp.controller('HomeController', ['$scope', 'UserService', 'MovieService', '$cookies', '$rootScope',
    function ($scope, UserService, MovieService, $cookies, $rootScope) {

        $scope.filter = '';
        $scope.sortField = 'createdAt';
        $scope.sortSense = 'desc';
        $scope.options = {
            editable: false
        };
        if ($cookies.get('moviesSortBy') && $cookies.get('moviesSortSense')) {
            $scope.sortField = $cookies.get('moviesSortBy');
            $scope.sortSense = $cookies.get('moviesSortSense');
        }
        $scope.userRatings = [];
        var getMovies = function () {
            MovieService.getAllBy($scope.sortField || 'createdAt', $scope.sortSense || 'desc')
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

        $rootScope.$on('movieDeleted', function (evt, movieId) {
            console.log('movieDeleted');
            $scope.movies = $scope.movies.filter(function (movie) {
                movie._id === movieId;
            });
        });

        getMovies();
    }]);