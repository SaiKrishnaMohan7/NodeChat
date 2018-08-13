const generateMessage = (from, text) => {
    return {from, text, createdAt: new Date()};
};

const generateLocationMessage = (from, lat, lng) => {
    let url = `https://www.google.com/maps?q=${lat},${lng}`;

    return {from, url, createdAt: new Date()};
};

module.exports = {generateMessage, generateLocationMessage};