const express = require('express');
const Joi = require('joi');
const http = require('http');
const SocketIo = require('socket.io')(http);
const fs = require('fs');
const path = require('path');
const app = express();
const Jimp = require('jimp');


app.use(express.json());

app.get('/', function (req, res) {
    res.sendfile('./image.html');
});

const port = process.env.PORT || 3000;
const server = http.Server(app);
server.listen(port, function () {
    console.log(`Listening to ${port}...`)
});

io = SocketIo(server);

io.on('connection', function (socket) {
    const readStream = fs.createReadStream('./public/images/upload.png', {
        encoding: 'binary'
    }), chuncks = [];

    readStream.on('readable', function () {
        console.log('image loading');
    });
    readStream.on('data', function (chunk) {
        chuncks.push(chunk);
    });

    readStream.on('end', function () {
        console.log('image loaded');
    })


})
//Connection to the socket library
//This is some classic socket.io event listening
socket.on('data', data => {
    console.log(data);
});
//Here is our socketio-file-upload code
const uploader = new SocketIOFileUpload(socket);

// When #file_button is clicked, the file in #fileUpload is uploaded.
uploader.listenOnSubmit(document.getElementById('file_button'), document.getElementById('fileUpload'));

uploader.addEventListener('start', (event)=> {
    event.file.meta.extension = 'csv';
});
