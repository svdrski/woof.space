const express = require('express')
const { connectToDb } = require('./Config/db.js');
const Router = require('./Routes/Router.js')
const cookieParser = require('cookie-parser');
const ChatController = require('./Controllers/ChatController.js')
const path = require('path');
const cors = require('cors');
const { Socket } = require('dgram');
const { default: mongoose } = require('mongoose');

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




const messageShema = new mongoose.Schema({
  text: String,
  name: String,
  id: String,
  recipientEmail: String,
  SocketID: String,
  roomId: String
})

const message = mongoose.model('message', messageShema)

let onlineUsers = []


socketIO.on('connection', (socket)=>{

    console.log('User', socket.id, 'Connected')

    //set list of online users and emit list to client
    socket.on('setUserOnline', async (data) => {
       if(!onlineUsers.some(item => item.user === data)) {await onlineUsers.push({user: data, id:socket.id})}
      socketIO.emit('onlineList', onlineUsers)
    })

    // save message to db and send to client dialog
    socket.on('message', async (data) => {
      const newMessage = new message(data)
      try{
        const save =  await newMessage.save()
      } catch(e) {console.log(e)}
      socketIO.to(data.roomId).emit('response', data);
    });

    //create dialog room and load all story
    socket.on('createDialog', async (data)=>{
      socket.join(data.roomId)
      console.log(`Пользователь отключен к комнате: ${data.roomId}`)
      try{
        const story = await message.find({roomId: data.roomId})
        socketIO.to(data.roomId).emit('messagesStory', story)
      } catch(e) {console.log(e)}
    })

    //disconnect User from dialog
    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
    });


    // show message if opponent typing something
    socket.on('typing', (data)=> socket.broadcast.to(data.roomId).emit('respTyping', data.message))


    //on disconnect update online list and send to all clients
    socket.on('disconnect', ()=>{
      console.log(socket.id, 'User disconnected')
      onlineUsers = onlineUsers.filter(item => item.id !== socket.id)
      socketIO.emit('onlineList', onlineUsers)
    })
})






server.listen(port, ()=>{console.log(`Server open on ${port}`)})
