const express = require('express');

const app=express();
const http = require('http');
const server=http.createServer(app);
const { Server }=require('socket.io');
const io=new Server(server);

app.use('/',express.static(__dirname + '/public'));

 io.on('connection',(socket)=>{
    console.log('a user connected');

      socket.on('msg_send',(data)=>{
        console.log(data);
        // io.emit('msg_rcvd',data);
        //socket.broadcast.emit('msg_rcvd',data);
        socket.emit('msg_rcvd',data);
      })

    
 });

server.listen(3000,()=>{
    console.log('Server started');
});

/**
 * io.emit() is for all websocket connnection that exists with corresponsding server
 * e.g. if any of browser chrome,internet,brave send message every browser in the room will receive message
 * 
 * socket.emit() is only for that particular client taht sends message will recieve it
 * e.g. if chrome sends message then only chrome receive,remainig are not going to receive message
 * 
 * socket.broadcast.emit() then remainig browser that donot send message will recieve it
 * e.g. if chrome sends then other than chrome all browser will receive
 */