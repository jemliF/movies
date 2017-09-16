moviesApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state({
            name: 'home',
            url: '/',
            controller: 'HomeController',
            templateUrl: 'templates/home.tmpl.html',
            resolve: {
                loggedIn: onlyLoggedIn
            }
        })
        .state({
            name: 'myMovies',
            url: '/my-movies',
            controller: 'MyMoviesController',
            templateUrl: 'templates/myMovies.tmpl.html',
            resolve: {
                loggedIn: onlyLoggedIn
            }
        })
        .state({
            name: 'login',
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'templates/login.tmpl.html'
        })
        .state({
            name: 'signup',
            url: '/signup',
            controller: 'SignupController',
            templateUrl: 'templates/signup.tmpl.html'
        })
        .state({
            name: 'newMovie',
            url: '/new-movie',
            controller: 'NewMovieController',
            templateUrl: 'templates/newMovie.tmpl.html',
            resolve: {
                loggedIn: onlyLoggedIn
            }
        });
    $urlRouterProvider.otherwise('/home');
}]);

var onlyLoggedIn = function ($q, jwtHelper, $cookies) {
    var deferred = $q.defer();
    if ($cookies.get('moviesToken') && (new Date().getTime() < new Date(jwtHelper.getTokenExpirationDate($cookies.get('moviesToken'))).getTime())) {
        deferred.resolve();
    } else {
        deferred.reject();
    }
    return deferred.promise;
};