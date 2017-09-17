moviesApp.controller('ActorSelectorController', ['$scope', 'ActorService', function ($scope, ActorService) {

    $scope.newActor = {};
    $scope.actors = [];
    $scope.actorSelectOptions = { enableSearch: true };
    $scope.$watch('selectedActors', function (newVal, oldVal) {
        console.log('changed', newVal);
        $scope.actors = $scope.selectedActors.map(function (actor) {
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
}]);