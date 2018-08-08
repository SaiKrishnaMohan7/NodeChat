const express = require('express');
const PORT = process.env.PORT || 3000;
const path = require('path');
const publicPath = path.join(__dirname, './../public');

var app = express();

app.use(express.static(publicPath));

app.listen(PORT, () => {
    console.log(`App Listening on ${PORT}`);
});