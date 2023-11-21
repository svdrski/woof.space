const express = require('express')
const { connectToDb } = require('./Config/db.js');
const Router = require('./Routes/Router.js')
const cookieParser = require('cookie-parser');
const ChatController = require('./Controllers/ChatController.js')
const path = require('path');
const cors = require('cors');
const { Socket } = require('dgram');

const App = express()
const server = require('http').Server(App)
const socketIO = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})


App.use(cookieParser());
App.use(express.json())
App.use(express.urlencoded({ extended: true }));
App.use(express.static(path.join(__dirname, './')));

App.use(cors({ 
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    credentials: true,
  }))
App.use(Router)


const port = 3333

 



connectToDb()



socketIO.on('connection', (socket)=>{
    console.log('User', socket.id, 'Connected')

    // socket.on('message', (data)=>{
    //   console.log(data)
    //   socketIO.emit('response', data)
    // })



    socket.on('message', (data) => {
      // Отправка сообщения всем пользователям в комнате
      socketIO.to(data.roomId).emit('response', data);
      console.log(`Сообщение в комнате ${data.roomId}: ${data}`);
  });


    socket.on('createDialog',(data)=>{
      socket.join(data)
      console.log(`Пользователь отключен к комнате: ${data}`)

    })

    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      console.log(`Пользователь отключен от комнаты: ${roomId}`);
  });

  

    socket.on('typing', (data)=> socket.broadcast.emit('respTyping', data))


    socket.on('disconnect', ()=>{
      console.log(socket.id, 'User disconnected')
    })
})






server.listen(port, ()=>{console.log(`Server open on ${port}`)})
