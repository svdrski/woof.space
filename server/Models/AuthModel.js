const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  password: String,
  name: String,
  email: {type: String, unique: true},
  dogname: String,
  breed: String,
  age: Number,
  gender:String,
  description: String,
  city: String,
  photos: [String],
  attempts: {type: Number, default: 0}
});



 const User = mongoose.model('users', userSchema);




class AuthModel {

    static async GetAll(email){
        const users = await User.find({email: {$ne: email} })
        // console.log(users)
        return users;
    }

    static async GetPhotos (email){
        try{
            const photos = await Photos.find({email})
            return photos
        } catch (e) {return e}
    }

    static async CheckEmail(email){
        try{
            const user = await User.find({email})
            return user
        } catch (e) {throw e}
    }


    static async Registration ( password, name, email,dogname, breed, age, gender, description, city, photosArr){
        try{
            const newUser = new User({password, name, email,dogname, breed, age, gender, description,city, photos: photosArr})
            const savedUser = await newUser.save()
            // console.log(savedUser)

            // const newPhotos = new Photos({email, photos: photosArr})
            // const savedPhotos = await newPhotos.save()
            // console.log(savedPhotos)
            return savedUser
        } catch (e) {return e}
       
    }
}

module.exports = {AuthModel, User}