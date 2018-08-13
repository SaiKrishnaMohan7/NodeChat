const socket = io();

function autoScroll() {
    // Selectors
    let $messages = jQuery('#messages');
    let $newMessage = $messages.children('li:last-child');

    // Heights
    let clientHeight = $messages.prop('clientHeight');
    let scrollTop = $messages.prop('scrollTop');
    let scrollHeight = $messages.prop('scrollHeight');
    let newMsgHeight = $newMessage.innerHeight();
    let lastMsgHeight = $newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight) {
        $messages.scrollTop(scrollHeight);
    } else {
        
    }
}

socket.on('connect', () => {
    console.log('Connectd to Server');
    let params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        } else {
            console.log('All good');
        }
    });
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
    autoScroll();
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