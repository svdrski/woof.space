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

const photosSchema = new  mongoose.Schema({
    email: String, 
    photos: [String]
})


const User = mongoose.model('users', userSchema);
const Photos = mongoose.model('photos', photosSchema)




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


    static async Registration ( password, name, email,dogname, breed, age, gender, description, city, photosArr){
        console.log('sss')
        try{
            const newUser = new User({password, name, email,dogname, breed, age, gender, description,city})
            const savedUser = await newUser.save()
            console.log(savedUser)

            const newPhotos = new Photos({email, photos: photosArr})
            const savedPhotos = await newPhotos.save()
            console.log(savedPhotos)
            return savedUser
        } catch (e) {return e}
       
    }
}

module.exports = AuthModel