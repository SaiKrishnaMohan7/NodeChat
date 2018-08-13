const socket = io();

socket.on('connect', () => {
    console.log('Connectd to Server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from Sever');
});

socket.on('newMessage', (message) => {
    console.log('New message emitted from server!', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
    // prevents default operation wherein data sent via url
    // on submit
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(data){
        console.log('Got it', data);
    });
});