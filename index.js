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
        
    });

    socket.on('add user', (username) => {
        socket.username = username;
        socket.broadcast.emit('user joined', {
            username: socket.username,
        });
        console.log("user  added ");
      
    });
   

});
app.post("/addUser", async(req, res)=>{
    var response = {"status":"user created"};
    try{
        console.log("req");
        //console.log(req.body);
        req.body = { id: req.body.id, name: req.body.name, email: req.body.email, creationDate: new Date(), 
                phoneNumber : req.body.phoneNumber, subscribed : req.body.subscribed, channels : req.body.channels };
        const db = await connection();
        await db.collection("userNotification").insertOne(req.body);   
        
       // console.log(response);
        
        res.status(200).json(response);
        //console.log("after of setting res");
    }catch(error) {
        //console.log("error creating user");
        //console.log(error);
        res.status(500).json({"status":"error adding user"});
    }
});

app.get("/history", async(req, res)=>{
    
    var response = [];
    try{
        
        const db = await connection();
        var response = await db.collection("userNotification").find({}).sort({ creationDate: -1 }).toArray();
        
        //console.log(response);
        
        res.status(200).json(response);
      
    }catch(error){
       // console.log("error searching data");
       // console.log(error);
        res.status(500).json([]);
    }
});

server.listen(port, () => {
    console.log('started...');
});