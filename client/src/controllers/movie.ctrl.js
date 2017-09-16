moviesApp.controller('MovieController', ['$scope', 'UserService', 'MovieService', '$cookies', 'RatingService', 'currentUser', '$rootScope',
    function ($scope, UserService, MovieService, $cookies, RatingService, currentUser, $rootScope) {
        var sum = 0;
        $scope.userRating = {
            value: 0,
            comment: ''
        };
        $scope.showCommentField = false;
        $scope.showRatings = false;
        $scope.toggleEdit = false;
        $scope.movieAlreadyRatedByUser = false;
        var fetchMovieRatings = function () {
            RatingService.getAllBy(null, $scope.movie._id)
                .then(function (ratings) {
                    $scope.movie.ratings = ratings.data;
                    sum = 0;
                    $scope.movie.ratings.forEach(function (rating, indice) {
                        sum += rating.value;
                        if (indice === $scope.movie.ratings.length - 1) {
                            $scope.movie.rating = sum / $scope.movie.ratings.length;
                        }
                    });
                }, function (err) {
                    console.error(err);
                });
        };

        fetchMovieRatings();
        RatingService.getAllBy(currentUser._id, $scope.movie._id)
            .then(function (userRating) {
                if (userRating.data.length > 0) {
                    $scope.movieAlreadyRatedByUser = true;
                    $scope.userRating = userRating.data[0];
                }
            }, function (err) {
                console.error(err);
            });
        $scope.toggleRating = function () {
            $scope.showCommentField = true;
        }
        $scope.rate = function () {
            $scope.showCommentField = false;
            if ($scope.movieAlreadyRatedByUser) {
                RatingService.update($scope.userRating._id, {
                    user: currentUser._id,
                    movie: $scope.movie._id,
                    value: $scope.userRating.value,
                    date: new Date(),
                    comment: $scope.userRating.comment
                })
                    .then(function (rating) {
                        console.log(rating);
                        $scope.userRating = rating.data;
                        fetchMovieRatings();
                    }, function (err) {
                        console.error(err);
                    });
            } else {
                RatingService.create({
                    user: currentUser._id,
                    movie: $scope.movie._id,
                    value: $scope.userRating.value,
                    date: new Date(),
                    comment: $scope.userRating.comment
                })
                    .then(function (rating) {
                        console.log(rating);
                        $scope.userRating = rating.data;
                        fetchMovieRatings();
                    }, function (err) {
                        console.error(err);
                    });
            }
        };

        $scope.delete = function () {
            if (window.confirm('Delete ' + $scope.movie.name)) {
                MovieService.delete($scope.movie._id)
                    .then(function (result) {
                        $rootScope.$broadcast('movieDeleted', $scope.movie._id);
                        alert('Movie deleted successfully');
                    }, function (err) {
                        console.error(err);
                        if (err.data.message) {
                            alert(err.data.message);
                        }
                    });
            }
        }
    }]);