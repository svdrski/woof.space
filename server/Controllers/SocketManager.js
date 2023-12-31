const { default: mongoose } = require('mongoose');


const messageShema = new mongoose.Schema({
  text: String,
  name: String,
  id: String,
  recipientEmail: String,
  SocketID: String,
  roomId: String,
  time: {
    type: String,
    required: true,
  },
  isReaded:{type: Boolean, default: false}
})

const message = mongoose.model('message', messageShema)

let onlineUsers = []

function initSocket(socketIO) {
socketIO.on('connection', (socket)=>{

  console.log('User', socket.id, 'Connected')

  //set list of online users and emit list to client
  socket.on('setUserOnline', async (data) => {
     if(!onlineUsers.some(item => item.user === data)) {await onlineUsers.push({user: data, id:socket.id})}
    socketIO.emit('onlineList', onlineUsers)
    const NotReadedMsg = await message.find({recipientEmail:data, isReaded:false})
    socket.emit('unreadedMessages', NotReadedMsg)
  })

  socket.on('setReaded', async (data) => {
    const updateReaded = await message.updateMany({id: data.opponent, recipientEmail: data.user},{isReaded: true})
    socketIO.to(data.roomId).emit('finisgMsgUpdate', data)
  })

  
  // save message to db and send to client dialog
  socket.on('message', async (data) => {
    const newMessage = new message(data)
    try{
      const save =  await newMessage.save()
      socketIO.to(data.roomId).emit('response', save);

      const user = onlineUsers.find(item => item.user === data.recipientEmail)
    
    //отправить отправителю в стейт с нечитанными сообщение и запушить его вконец
    if (user){socketIO.to(user.id).emit('addUnreaded', save )}
      socketIO.to(data.roomId).emit('UpdateReaded', save)
  } catch(e) {console.log(e)}
  });


  socket.on('saveReaded', async (data)=>{
    const result = await message.updateMany({_id: { $in: data }}, {isReaded: true}) 
  } )

  socket.on('readedNow', async (data) =>{
    console.log("FFFFFFFFFFF@@@")
    const user = onlineUsers.find(item => item.user === data.user)
    if (user){socketIO.to(user.id).emit('makeReaded', data)}
  })

  socket.on('uploadToDbMsgDialog', async (data)=>{
    const result = await message.updateMany({roomId: data.room}, {isReaded: true}) 
     const user = onlineUsers.find(item => item.user === data.user)
    if (user){socketIO.to(user.id).emit('finisgMsgUpdate', data)}
  })



  //create dialog room and load all story
  socket.on('createDialog', async (data)=>{
    socket.join(data.roomId)
    console.log(`Пользователь подключен к комнате: ${data.roomId}`)
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


  socket.on('getLastMessages',async (data)=>{
    console.log('FOFOF',data)
    const response = []
    for(let item of data) {
      const data = await message.find({roomId: item })
      data.length && response.push(data[data.length - 1])
    }
    socket.emit('lastMsgList', (response))
  })


  socket.on('updateOppDialogPrev', (data)=>{
    try{
        const userinList = onlineUsers.find(user => user.user === data.id)
        userinList && socketIO.to(userinList.id).emit('updateLastMessage', {id: data.id, text: [data.message], opponent: data.opponent})
    } catch(e){console.log('Error> ', e)}

  })


})
}


module.exports = {initSocket}