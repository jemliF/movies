moviesApp.controller('NavbarController', ['$scope', '$rootScope', '$cookies', '$state',
    function ($scope, $rootScope, $cookies, $state) {
        $scope.loggedIn = false;
        if ($cookies.get('moviesToken')) {
            $scope.loggedIn = true;
        }

        $rootScope.$on('loggedIn', function (evt) {
            console.log('loggedin');
            $scope.loggedIn = true;
        });

        $scope.logout = function () {
            console.log('logout');
            $cookies.remove('moviesToken');
            $scope.loggedIn = false;
            $state.go('login');
        };
    }]);