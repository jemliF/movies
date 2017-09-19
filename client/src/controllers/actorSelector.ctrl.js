moviesApp.controller('ActorSelectorController', ['$scope', 'ActorService', function ($scope, ActorService) {

    $scope.newActor = {};
    $scope.actorSelectOptions = {enableSearch: true};
    $scope.$watch('selectedActors', function (newVal, oldVal) {
        if ($scope.selectedActors.length > 0) {
            $scope.actors = $scope.selectedActors.map(function (actor) {
                return actor.id;
            });
        }
    }, true);
    $scope.createNewActor = function () {
        ActorService.create($scope.newActor)
            .then(function (res) {
                $scope.actorList.push({
                    id: res.data._id,
                    label: res.data.firstname + ' ' + res.data.lastname
                });
                $scope.newActor = {};
                $scope.toggleNewActor = false;
            }, function (err) {
                if (err.data.message) {
                    alert(err.data.message);
                }
            });
    };
}]);