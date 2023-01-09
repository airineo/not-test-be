let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('usuario conectado');

    /*socket.on('new-message', (mensaje) => {
        console.log("mensaje en socke on");
        console.log(mensaje);
        //enviar un evento a todos los conectados al servidor**
        socket.emit(mensaje);
        console.log("en teoría envío algo...");
    }); */
    socket.on('new-message', (message) => {
    	console.log("mensaje en socke on");
        console.log(message);
        console.log("usuario en el socket ");
        console.log(socket.username);
        message = socket.username +": "+  message;
        io.emit('new-message', message);  
    });

    //Intentando agregar usuario:
    socket.on('add user', (username) => {
        console.log("en metodo add user");
        socket.username = username;
        console.log("agregando usuario..." + socket.username);
        socket.broadcast.emit('user joined', {
            username: socket.username,
        });
      
    });
   

});

server.listen(port, () => {
    console.log(`iniciado en pueto: ${port}`);
});