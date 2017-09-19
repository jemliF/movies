moviesApp.controller('SignupController', ['$scope', 'UserService', '$state',
    function ($scope, UserService, $state) {
    $scope.user = {};
    $scope.retypePassword = '';
    $scope.signup = function () {
        UserService.create($scope.user)
            .then(function (user) {
                alert('Account created successfully');
                $state.go('login');
            }, function (err) {
                if (err.data.message) {
                    alert(err.data.message);
                }
            });
    };
}]);