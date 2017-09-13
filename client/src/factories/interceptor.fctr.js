moviesApp.factory('httpRequestInterceptor', ['$cookies',
    function ($cookies) {
        return {
            request: function (config) {
                config.headers['Authorization'] = $cookies.get('moviesToken');
                return config;
            }
        };
    }]);

moviesApp.config(['$httpProvider',
    function ($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
    }]);