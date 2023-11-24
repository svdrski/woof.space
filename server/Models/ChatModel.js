const {User} = require('./AuthModel')
class ChatModel {

    static async getOpponents (list){
       const userList = await User.find({email: {$in: list}})
    //    console.log(userList)


       return(userList)
    }
}

module.exports = ChatModel


