var socket=io();

let btn=document.getElementById("btn");
let inputMsg=document.getElementById("newmsg");
let msgList=document.getElementById("msglist");

btn.onclick=function exec(){
    socket.emit('msg_send',{
        msg:inputMsg.value,
    });
}

socket.on('msg_rcvd',(data)=>{
    const div=document.createElement('div');
    div.innerText=data.msg;
    document.body.appendChild(div);
})