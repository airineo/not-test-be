let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    
    socket.on('new-message', (message) => {
        message = socket.username +":"+  message + ":" + socket.id;
        io.emit('new-message', message);  
        console.log(message);
    });

    socket.on('add user', (username) => {
        socket.username = username;
        socket.broadcast.emit('user joined', {
            username: socket.username,
        });
        console.log("usuario agregado ");
      
    });
   

});

server.listen(port, () => {
    console.log('started...');
});