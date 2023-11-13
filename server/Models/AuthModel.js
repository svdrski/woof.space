const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  password: String,
  name: String,
  email: {type: String, unique: true},
  dogname: String,
  breed: String,
  age: String,
  gender:String,
  description: String,
  city: String

});

const User = mongoose.model('users', userSchema);



class AuthModel {

    static async GetAll(){
        const users = await User.find()
        return users;
    }

    static async CheckEmail(email){
        try{
            const user = await User.find({email})
            return user
        } catch (e) {return e}
    }


    static async Registration ( password, name, email,dogname, breed, age, gender, description, city){
        try{
            const newUser = new User({password, name, email,dogname, breed, age, gender, description,city})
            console.log(newUser)
            const savedUser = await newUser.save()
            console.log(savedUser)
            return savedUser
        } catch (e) {return e}
       
    }
}

module.exports = AuthModel