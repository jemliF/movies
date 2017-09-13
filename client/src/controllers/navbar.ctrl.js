moviesApp.controller('NavbarController', ['$scope', '$rootScope', '$cookies',
    function ($scope, $rootScope, $cookies) {
        $scope.loggedIn = true;
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
        };
    }]);