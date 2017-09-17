moviesApp.controller('HomeController', ['$scope', 'UserService', 'MovieService', '$cookies',
    function ($scope, UserService, MovieService, $cookies) {

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

        getMovies();
    }]);