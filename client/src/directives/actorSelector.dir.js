moviesApp.directive('actorSelector', [function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/actorSelector.tmpl.html',
        controller: 'ActorSelectorController',
        scope: {
            actorList: '=',
            selectedactors: '=',
        }
    }
}]);