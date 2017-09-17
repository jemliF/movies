module.exports = function (server) {
    const io = require('socket.io').listen(server);
    var connections = [];
    io.on('connection', function (socket) {
        //console.log(socket);
        connections.push(socket);
        console.log('%s sockets connected ', connections.length);

        socket.on('movieRated', function (data) {
            console.log('movieRated', data);
            socket.broadcast.emit('movieRated', data);
        });
        socket.on('movieDeleted', function (data) {
            console.log('movieDeleted', data);
            socket.broadcast.emit('movieDeleted', data);
        });
        socket.on('movieEdited', function (data) {
            console.log('movieEdited', data);
            socket.broadcast.emit('movieEdited', data);
        });
    });
};