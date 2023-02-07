const express = require('express')
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const connection = require("./connection");


app.use(cors({origin : "*"}));
app.use(bodyParser.json());


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
app.get("/history", async(req, res)=>{
    console.log("be confirmar!")
    var response = [];
    try{
        console.log("ejecutar esperar coneccion ...");
        console.log("solicitiud :");
        
        const db = await connection();
        var response = await db.collection("carta").find({}).toArray();
        
        console.log("carta");
        console.log(response);
        
        res.status(200).json(response);
      
    }catch(error){
        console.log("error searching data");
        console.log(error);
        res.status(500).json([]);
    }
});

server.listen(port, () => {
    console.log('started...');
});