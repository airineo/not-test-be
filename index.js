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
        io.emit('new-message', message);
    });
});

server.listen(port, () => {
    console.log(`iniciado en pueto: ${port}`);
});