const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './../public');
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });

    socket.emit('newMessage', {
        message: 'KhullaLullaKhadaLulla',
        to: 'Client Sharma'
    });

    socket.on('createMessage', (newMessage) => {
        console.log('Client wants to create a new msg', newMessage);
    });
});

server.listen(PORT, () => {
    console.log(`App Listening on ${PORT}`);
});