moviesApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
        name: 'home',
        url: '/',
        controller: 'HomeController',
        templateUrl: 'templates/home.tmpl.html'
    })
        .state({
            name: 'login',
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'templates/login.tmpl.html'
        }).state({
        name: 'signup',
        url: '/signup',
        controller: 'SignupController',
        templateUrl: 'templates/signup.tmpl.html'
    })
        .state({
            name: 'newMovie',
            url: '/new-movie',
            controller: 'NewMovieController',
            templateUrl: 'templates/newMovie.tmpl.html'
        });
}]);