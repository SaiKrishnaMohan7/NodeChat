const socket = io();

socket.on('connect', () => {
    console.log('Connectd to Server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from Sever');
});

socket.on('newMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('H:HH:ss');
    let li = jQuery('<li></li>');

    li.text(`${message.from} @ ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (locMsg) => {
    let formattedTime = moment(locMsg.createdAt).format('H:HH:ss');
    let li = jQuery('<li></li>');

    // _blank redirection in a new tab
    let a = jQuery('<a target="_blank">My location</a>');

    li.text(`${locMsg.from} @ ${formattedTime}: `);
    a.attr('href', locMsg.url);
    li.append(a);

    jQuery('#messages').append(li);
});

var $msgTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function(e){
    // prevents default operation wherein data sent via url
    // on submit
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $msgTextBox.val()
    }, function(data){
        $msgTextBox.val('');
        console.log('Got it', data);
    });
});

var $sendLoc = jQuery('#sendLocation');

// Geolocation setup
$sendLoc.on('click', function(){
    if(!navigator.geolocation) return alert('gelocation not supported');

    toggleLoc($sendLoc, 'Sending Location...');
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        toggleLoc($sendLoc, 'Send Location', true);
        socket.emit('createLocationMessage', {lat, lng});
    }, () => {
        toggleLoc($sendLoc, 'Send Location', true);
        alert('unable to get location');
    });
});

toggleLoc = (button, msg, enable=false) => {
    if (enable) {
        button.removeAttr('disabled').text(`${msg}`);
    }else{
        button.attr('disabled', 'disabled').text(`${msg}`);
    }
};