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

socket.on('newLocationMessage', (locMsg) => {
    let li = jQuery('<li></li>');
    // _blank redirection in a new tab
    let a = jQuery('<a target="_blank">My location</a>');

    li.text(`${locMsg.from}: `);
    a.attr('href', locMsg.url);
    li.append(a);

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

var $sendLoc = jQuery('#sendLocation');

// Geolocation setup
$sendLoc.on('click', function(){
    if(!navigator.geolocation) return alert('gelocation not supported');

    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        socket.emit('createLocationMessage', {lat, lng});
    }, () => {
        alert('unable to get location');
    });
});