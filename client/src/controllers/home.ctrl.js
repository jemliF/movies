moviesApp.controller('HomeController', ['$scope', 'UserService', 'MovieService', '$cookies', 'RatingService', 'currentUser',
    function ($scope, UserService, MovieService, $cookies, RatingService, currentUser) {

        $scope.filter = '';
        $scope.sortField = 'createdAt';
        $scope.sortSense = 'desc';
        if ($cookies.get('moviesSortBy') && $cookies.get('moviesSortSense')) {
            $scope.sortField = $cookies.get('moviesSortBy');
            $scope.sortSense = $cookies.get('moviesSortSense');
        }
        var sum = 0;
        $scope.userRatings = [];
        var getMovies = function () {
            MovieService.getAllBy($scope.sortField || 'createdAt', $scope.sortSense || 'desc')
                .then(function (res) {
                    $scope.movies = res.data;
                    $scope.movies.forEach(function (movie, index) {
                        RatingService.getAllBy(null, movie._id)
                            .then(function (ratings) {
                                movie.ratings = ratings.data;
                                sum = 0;
                                movie.ratings.forEach(function (rating, indice) {
                                    sum += rating.value;
                                    if (indice === movie.ratings.length - 1) {
                                        movie.rating = sum / movie.ratings.length;
                                    }
                                });
                            }, function (err) {
                                console.error(err);
                            });
                        RatingService.getAllBy(currentUser._id, null)
                            .then(function (userRating) {
                                console.log(userRating);
                                $scope.userRatings[index] = {
                                    value: 0,
                                    comment: ''
                                };
                                if (userRating.data.length > 0) {
                                    $scope.userRatings[index].value = userRating[0].value;
                                }
                            }, function (err) {
                                console.error(err);
                            });
                    });
                }, function (err) {
                    console.error(err);
                });
        };

        $scope.rate = function (index) {
            /*RatingService.create({
                user: currentUser._id,
                movie: $scope.movies[index]._id,
                value: userRatings[index].value,

            })*/
        };

        $scope.fetchMovies = function () {
            getMovies();
            $cookies.put('moviesSortBy', $scope.sortField);
            $cookies.put('moviesSortSense', $scope.sortSense);
        };

        getMovies();
    }]);