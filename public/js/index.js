var socket = io();

socket.on('connect', () => {
    console.log('Connectd to Server');

    socket.emit('createMessage', {
        message: 'HullaBullaEatMyLulla',
        to: 'Server Singh'
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from Sever');
});

socket.on('newMessage', (message) => {
    console.log('Client Says', message);
});
