module.exports = function (server) {
    const io = require('socket.io').listen(server);
    io.on('connection', function (socket) {

        socket.on('movieRated', function (data) {
            socket.broadcast.emit('movieRated', data);
        });
        socket.on('movieDeleted', function (data) {
            socket.broadcast.emit('movieDeleted', data);
        });
        socket.on('movieEdited', function (data) {
            socket.broadcast.emit('movieEdited', data);
        });
    });
};