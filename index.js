const express = require('express');

const app=express();
const http = require('http');
const server=http.createServer(app);
const { Server }=require('socket.io');
const io=new Server(server);
const connect = require('./config/database-config')
const Chat=require('./models/chat');



 io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.on('join_room',(data)=>{
        console.log('joining a room',data.roomid);
        socket.join(data.roomid);
    });

      socket.on('msg_send',(data)=>{

        const chat=Chat.create({
            roomId: data.roomid,
            user :data.username,
            content :data.msg
        })
        io.to(data.roomid).emit('msg_rcvd',data);

        //socket.broadcast.emit('msg_rcvd',data);
        // socket.emit('msg_rcvd',data);
      });

      socket.on ('typing',(data)=>{
        socket.broadcast.to(data.roomid).emit('someone_typing');
      })
        

    
 });

 app.set('view engine','ejs');
 app.use('/',express.static(__dirname + '/public'));

 app.get('/chat/:roomid',async(req,res)=>{
    const chats = await Chat.find({
        roomId: req.params.roomid
    }).select('content user');
    // console.log(chats);
    res.render('index', {
        name: 'Sanket',
        id: req.params.roomid,
        chats: chats
    });
 })

server.listen(3000,async()=>{
    console.log('Server started');

    await connect();
    console.log("mongodb connected");
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