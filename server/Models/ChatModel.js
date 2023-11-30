const {User} = require('./AuthModel')
class ChatModel {

    static async getOpponents (list){
       const userList = await User.find({email: {$in: list}})
       return(userList)
    }
}

module.exports = ChatModel


