moviesApp.controller('LoginController', ['$scope', 'UserService', '$cookies', '$state', '$rootScope',
    function ($scope, UserService, $cookies, $state, $rootScope) {
        $scope.email = '';
        $scope.password = '';
        $scope.login = function () {
            UserService.login($scope.email, $scope.password)
                .then(function (res) {
                    $state.go('home');
                    $cookies.put('moviesToken', res.data.token);
                    $rootScope.$broadcast('loggedIn');
                }, function (err) {
                    if (err.data.statusCode === 404) {
                        alert('Unrecognized Account');
                    } else if (err.data.statusCode === 401) {
                        alert('Wrong Credentials');
                    } else {
                        if (err.data.message) {
                            alert(err.data.message);
                        } else {
                            alert("Unknown error, please try again");
                        }
                    }
                });
        };
    }
]);