moviesApp.controller('NewMovieController', ['$scope', 'currentUser', '$state', 'MovieService', 'ActorService',
    function ($scope, currentUser, $state, MovieService, ActorService) {
        $scope.movie = {};
        $scope.selectedActors = [];
        $scope.actors = [];
        $scope.actorList = [];
        $scope.newActor = {};
        $scope.actorSelectOptions = {enableSearch: true};
        $scope.toggleNewActor = false;
        $scope.createMovie = function () {
            $scope.movie.createdBy = currentUser._id;
            MovieService.create($scope.movie)
                .then(function (movie) {
                    alert('Movie created successfully');
                    $state.go('home');
                }, function (err) {
                    console.error(err);
                    if (err.data.message) {
                        alert(err.data.message);
                    }
                });
        };

        $scope.$watch('selectedActors', function (newVal, oldVal) {
            console.log('changed', newVal);
            $scope.movie.actors = $scope.selectedActors.map(function (actor) {
                return actor.id;
            });
        }, true);

        $scope.createNewActor = function () {
            ActorService.create($scope.newActor)
                .then(function (res) {
                    console.log(res.data);
                    $scope.actors.push(res.data);
                    $scope.actorList.push({
                        id: res.data._id,
                        label: res.data.firstname + ' ' + res.data.lastname
                    });
                }, function (err) {
                    console.error(err);
                });
        };

        ActorService.getAll()
            .then(function (res) {
                $scope.actors = res.data;
                $scope.actorList = res.data.map(function (actor) {
                    return {id: actor._id, label: actor.firstname + ' ' + actor.lastname};
                });
            }, function (err) {
                alert(err.data.message);
            });
    }]);