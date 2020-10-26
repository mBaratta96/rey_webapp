const express = require('express');
const fs = require('fs');
const Jimp = require('jimp');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const {PythonShell} = require('python-shell');
app.use(express.json());
app.use('/images', express.static(__dirname+"/public/images"));
app.use('/script', express.static(__dirname+"/Scripts"));


app.get('/', function (req, res) {
    res.sendFile(__dirname+'/image2.html');
});

app.get('/api', function (req, res) {
    res.sendFile(__dirname+'/imageOp.html')
})

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('points', function(msg, fn){
        console.log('message: ' + msg);
        fs.writeFile('points.json', msg, function (err) {
            if(err) {
                return console.log(err);
            }
            fn("ok");
        });

    });
    socket.on('image', function (file, fn) {
        fs.writeFile("./public/images/img.png", file, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
            findHomography(fn);
            
        });
    })
});
//change here to python path
function findHomography(fn) {
    let options = {
        mode: 'text',
        pythonPath: 'C:\\Python38\\python.exe',
        args: ['./public/images/img.png', './points.json']
    };
    PythonShell.run('./Scripts/selectRect.py', options, function(err, result) {
        if (err) throw err;
        console.log('selectRect.py finished');
        options = {
            mode: 'text',
            pythonPath: 'C:\\Python38\\python.exe',
            args: ['./public/images/img_homography.png']
        };
        PythonShell.run('./Scripts/edge.py', options, function(err, result) {
            if (err) throw err;
            console.log('edge.py finished');
            fn('Ok');
        });
    });

}



const port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log(`Listening to ${port}...`)
});