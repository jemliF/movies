moviesApp.directive('movie', [function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/movie.tmpl.html',
        controller: 'MovieController',
        scope: {
            movie: '=',
            options: '='
        }
    }
}]);