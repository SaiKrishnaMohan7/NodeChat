const socket = io();
const $select = jQuery('#room-select');

// Provides an Updated list of Rooms that could be joined
socket.on('updateActiveRooms', (roomsArr) => {
    roomsArr.forEach(room => {
        $select.append(jQuery('<option>', {
            value: room,
            text: room
        }));
    });
});

// Change event, set room when option selected
$select.change(() => {
    let $roomTB = jQuery('[name=room]');

    if ($select.val()){
        $roomTB.val($select.val());
    }
});