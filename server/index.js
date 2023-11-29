const express = require('express')
const { connectToDb } = require('./Config/db.js');
const Router = require('./Routes/Router.js')
const cookieParser = require('cookie-parser');
const ChatController = require('./Controllers/ChatController.js')
const path = require('path');
const cors = require('cors');
const  {initSocket} = require('./Controllers/SocketManager.js')
const App = express()
const server = require('http').Server(App)
const port = 3333
const socketIO = require('socket.io')(server, {cors: { origin: process.env.CLIENTLINK, methods: ['GET', 'POST'], credentials: true}});
require('dotenv').config(); 

App.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://clientsite.onrender.com'); // Разрешить доступ с этого домена
  res.header('Access-Control-Allow-Credentials', true); // Разрешить отправку куки
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Разрешенные методы
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Разрешенные заголовки
  next();
});

App.use(cors({ origin: process.env.CLIENTLINK, methods: ['GET', 'POST'], credentials: true,}))
App.use(cookieParser());
App.use(express.json())
App.use(express.urlencoded({ extended: true }));
App.use(express.static(path.join(__dirname, './')));
App.use(Router)




//connect to mongo
connectToDb()
//Start socket IO listener
initSocket(socketIO)


server.listen(process.env.PORT || port, ()=>{console.log(`Server open on ${port}`)})

