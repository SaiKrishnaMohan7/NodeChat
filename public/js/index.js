const socket = io();

socket.on('connect', () => {
    console.log('Connectd to Server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from Sever');
});

socket.on('newMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('H:HH:ss');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', (locMsg) => {
    let formattedTime = moment(locMsg.createdAt).format('H:HH:ss');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: locMsg.from,
        createdAt: formattedTime,
        url: locMsg.url
    });

    jQuery('#messages').append(html);
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