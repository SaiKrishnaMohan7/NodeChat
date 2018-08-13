const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './../public');
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // Welcome message to new user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Sai Chat'));

    // Inform other users that a new user has joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessgae emitted from client!', message);
        // Emit message to all the sockets (users) connected
        io.emit('newMessage', generateMessage(message.from, message.text));
        // Inform Front-End
        callback('This is an ack from server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`App Listening on ${PORT}`);
});