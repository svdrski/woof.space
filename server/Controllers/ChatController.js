const ChatModel = require ('../Models/ChatModel')
const { Server } = require('socket.io');



class ChatController {

    static async GetOpponents (req, res){
        try{
            const {matches} = req.body
            const list = await ChatModel.getOpponents(matches)
            res.send(list)
        } catch (e) {res.send('Error ' + e)}

    }


    static async initChat(io, socket) {
        socket.on('initChat', async(data)=>{
            const {userId, opponentId} = data

            const chatRoom = `${userId}_${opponentId}`
            socket.join(chatRoom)

            io.to(socket.id).emit('ChatInit', {chatRoom})
        })
    }



}



module.exports = ChatController