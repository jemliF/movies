moviesApp.factory('currentUser', ['$cookies', 'jwtHelper',
    function ($cookies, jwtHelper) {
        return jwtHelper.decodeToken($cookies.get('moviesToken')).user;
    }]);