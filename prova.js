const Logger = require('./logger');
const logger = new Logger();

const path = require('path');
var pathObk = path.parse(__filename);
console.log(pathObk);

const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();
console.log(`Total Memory: ${totalMemory}; Free Memory: ${freeMemory}`);

const fs = require('fs');
// const files = fs.readdirSync('./');
// console.log(files);

fs.readdir('./', function (err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files);
});



// i need a listener for my event, i register that, function cqlled when that event is raised
logger.on('messageLogged', function (arg) {
    console.log('Listener called', arg);
});
//raise an event

logger.log('message');

const http = require('http');
const server = http.createServer(function (req, res) {
    console.log(req.url);
    if(req.url === '/'){
        res.write('Hello Word');
        res.end();
    }
    if(req.url === '/prova'){
        res.write(JSON.stringify([1, 2 , 3]));
        res.end();
    }
}); //server is an event emitter

server.listen(3000);
console.log('Listening on port 3000...');
