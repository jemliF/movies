moviesApp.controller('NavbarController', ['$scope', '$rootScope', '$cookies', '$state', 'eventSocket',
    function ($scope, $rootScope, $cookies, $state, eventSocket) {
        $scope.loggedIn = false;
        if ($cookies.get('moviesToken')) {
            $scope.loggedIn = true;
        }

        $rootScope.$on('loggedIn', function (evt) {
            $scope.loggedIn = true;
        });

        eventSocket.on('movieRated', function (data) {
            alert('User ' + data.rating.user.firstname + ' ' + data.rating.user.lastname + 'just gave ' + data.rating.value + ' stars to \"' + data.rating.movie.name + '\"');
        });
        eventSocket.on('movieDeleted', function (data) {
            alert('Movie ' + data.movie.name + ' was deleted');
        });

        eventSocket.on('movieEdited', function (data) {
            alert('Movie ' + data.movie.name + ' was edited');
        });

        $scope.logout = function () {
            $cookies.remove('moviesToken');
            $scope.loggedIn = false;
            $state.go('login');
        };
    }]);