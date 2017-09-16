moviesApp.directive('navbar', [function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/navbar.tmpl.html',
        controller: 'NavbarController'
    }
}]);