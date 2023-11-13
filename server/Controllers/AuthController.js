const AuthModel = require('../Models/AuthModel.js')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const path = require('path');




class AuthController {


    static async AllUsers(req, res) {
        const users = await AuthModel.GetAll()
        console.log(users)
        res.send(users)
    }





    static async Registration  (req, res){
        try{
            const {name, email, password, password2, dogname, breed, age, gender, description, city} = req.body

            if(!name || !email || !password || !password2) {return res.status(409).send('Empty fields')}
            if(!dogname || !breed || !age || !gender || !description || !city) {return res.status(410).send('Empty fields')}
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {return res.status(409).send('Wrong email')}
            const emailCheck = await AuthModel.CheckEmail(email)
            if(emailCheck.length) {return res.status(409).send('User with this email already exist')}
            if(password.length < 5) {return res.status(409).send('Password length is less then 5')}
            if(password !== password2) {return res.status(409).send('Password mismatch')}

            //Hashing Password
            async function hashPass () {
                const pass = await bcrypt.hash(password, 10)
                return pass
            }
            const finalPassword = await hashPass()

            const photosArr = [];
            if (req.files.photos) {
                req.files.photos.forEach(a => {
                    const relativePath = path.relative(__dirname, a.path);
                    photosArr.push(relativePath.replace(/\\/g, '/')); 
                });
                console.log(photosArr);
            }

            await AuthModel.Registration (finalPassword, name, email,dogname, breed, age, gender, description, city, photosArr)



            
        } catch (e) {res.send('Error ' + e)}


    }
}

module.exports = AuthController