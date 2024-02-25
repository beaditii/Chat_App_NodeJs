const express = require('express');

const app=express();
const http = require('http');
const server=http.createServer(app);
const { Server }=require('socket.io');
const io=new Server(server);

app.use('/',express.static(__dirname + '/public'));

 io.on('connection',(socket)=>{
    console.log('a user connected');

      socket.on('from_client',()=>{
        console.log('event coming from client');
      })
      
    setInterval(()=>{
        socket.emit('from_server');
    },5000);
 });

server.listen(3000,()=>{
    console.log('Server started');
});