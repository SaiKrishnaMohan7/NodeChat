const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const _ = require('lodash');

const publicPath = path.join(__dirname, './../public');
const PORT = process.env.PORT || 3000;

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // User Join
    
    socket.on('join', (params, callback) => {
        let room = params.room;
        let name = params.name;
        let id = socket.id;

        if(!(_.isString(_.trim(name)) && _.isString(_.trim(room)))){
            return callback('Name and room are required');
        }

        socket.join(room);
        // remove user from other rooms before adding to the new room
        users.removeUser(id);
        users.addUser({id, name, room});

        // Emit to particular room
        io.to(room).emit('updateUserList', users.getUserList(room));

        // Welcome message to new user
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to Sai Chat'));
    
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin',
                        `${name} has joined`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if(user && _.isString(_.trim(message.text))){
            // Emit message to all the sockets (users) connected
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        // Inform Front-End
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if(user && _.isObject(coords)){
            // Emit message to all the sockets (users) connected
            io.to(user.room).emit('newLocationMessage',
                        generateLocationMessage(user.name, coords.lat, coords.lng));
        }
    });

    // User Leave
    socket.on('disconnect', () => {
        console.log('User Disconnected');
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(PORT, () => {
    console.log(`App Listening on ${PORT}`);
});