moviesApp.controller('NewMovieController', ['$scope', 'currentUser', '$state', 'MovieService', 'ActorService',
    function ($scope, currentUser, $state, MovieService, ActorService) {
        $scope.movie = {};
        $scope.selectedActors = [];
        $scope.actorList = [];
        $scope.createMovie = function () {
            $scope.movie.actors = $scope.selectedActors.map(function (actor) {
                return actor.id;
            });
            $scope.movie.createdBy = currentUser._id;
            MovieService.create($scope.movie)
                .then(function (movie) {
                    alert('Movie created successfully');
                    $state.go('home');
                }, function (err) {
                    if (err.data.message) {
                        alert(err.data.message);
                    }
                });
        };

        ActorService.getAll()
            .then(function (res) {
                $scope.actorList = res.data.map(function (actor) {
                    return {id: actor._id, label: actor.firstname + ' ' + actor.lastname};
                });
            }, function (err) {
                if (err.data.message) {
                    alert(err.data.message);
                }
            });
    }]);