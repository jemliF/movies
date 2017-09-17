moviesApp.factory('eventSocket', function () {
    return io.connect('http://localhost:4000');
});