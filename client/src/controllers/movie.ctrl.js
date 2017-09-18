moviesApp.controller('MovieController', ['$scope', 'UserService', 'MovieService', '$cookies', 'RatingService', 'currentUser', '$rootScope', 'eventSocket', 'ActorService',
    function ($scope, UserService, MovieService, $cookies, RatingService, currentUser, $rootScope, eventSocket, ActorService) {
        var sum = 0;
        $scope.selectedActors = [];
        $scope.actorList = [];
        $scope.actorSelectOptions = {enableSearch: true};
        $scope.userRating = {
            value: 0,
            comment: ''
        };
        $scope.showCommentField = false;
        $scope.showRatings = false;
        $scope.movieAlreadyRatedByUser = false;
        var fetchMovieRatings = function () {
            RatingService.getAllBy(null, $scope.movie._id)
                .then(function (ratings) {
                    $scope.ratings = ratings.data;
                    sum = 0;
                    $scope.ratings.forEach(function (rating, indice) {
                        sum += rating.value;
                        if (indice === $scope.ratings.length - 1) {
                            $scope.movie.rating = sum / $scope.ratings.length;
                        }
                    });
                }, function (err) {
                    console.error(err);
                });
        };

        if (!$scope.options.editable) {
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
                            eventSocket.emit('movieRated', {rating: rating.data});
                            fetchMovieRatings
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
                            eventSocket.emit('movieRated', {rating: rating.data});
                            fetchMovieRatings
                        }, function (err) {
                            console.error(err);
                        });
                }
            };
        } else {
            ActorService.getAll()
                .then(function (res) {
                    $scope.actorList = res.data.map(function (actor) {
                        return {id: actor._id, label: actor.firstname + ' ' + actor.lastname};
                    });
                }, function (err) {
                    alert(err.data.message);
                });
            $scope.delete = function () {
                if (window.confirm('Delete ' + $scope.movie.name)) {
                    MovieService.delete($scope.movie._id)
                        .then(function (result) {
                            $rootScope.$broadcast('movieDeleted', $scope.movie._id);
                            eventSocket.emit('movieDeleted', {movie: $scope.movie});
                            alert('Movie deleted successfully');
                        }, function (err) {
                            console.error(err);
                            if (err.data.message) {
                                alert(err.data.message);
                            }
                        });
                }
            }

            $scope.toggleEdit = function () {
                $scope.editableMovie = $scope.movie;
                $scope.editableMovie.releaseDate = new Date($scope.editableMovie.releaseDate);
                $scope.editableMovie.releaseDate = new Date($scope.editableMovie.releaseDate.getFullYear(),
                    $scope.editableMovie.releaseDate.getMonth(), $scope.editableMovie.releaseDate.getDate());
                $scope.selectedActors = $scope.movie.actors.map(function (actor) {
                    return {id: actor._id, label: actor.firstname + ' ' + actor.lastname};
                });
                $('#editModal' + $scope.movie._id).modal('show');
                console.log($scope.editableMovie);
            };

            $scope.update = function () {
                $scope.editableMovie.actors = $scope.selectedActors.map(function (actor) {
                    return actor.id;
                });
                $scope.editableMovie.createdBy = currentUser._id;
                MovieService.update($scope.movie._id, $scope.editableMovie)
                    .then(function (res) {
                        console.log(res.data);
                        //$scope.movie = res.data;
                        Object.assign($scope.movie, res.data);
                        $('#editModal' + $scope.movie._id).modal('hide');
                        eventSocket.emit('movieEdited', {movie: $scope.movie});
                    }, function (err) {
                        console.error(err);
                        alert(err.data.message);
                    });
            };

        }

    }]);