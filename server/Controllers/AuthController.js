const AuthModel = require('../Models/AuthModel.js')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken')




class AuthController {


    static async AllUsers(req, res) {
        const users = await AuthModel.GetAll()
        console.log(users)
        res.send(users)
    }

    static  Auth  (req, res) {
        const token = req.cookies.token
        jwt.verify(token, 'KEY',async (err, decoded)=>{
            if(err){return res.status(401).send('Auth failed')}
            console.log(decoded.email)
            const user = await AuthModel.CheckEmail(decoded.email)
            const photos = await AuthModel.GetPhotos(decoded.email)
            const result = [...photos, ...user]
            res.status(201).send(result)
        })
    }



    // static async GetLoggedInUser (req, res) {

    //     const token = req.cookies.token
    //     if(!token) {return res.status(401).send('Unauthorized')}
    //     jwt.verify(token, 'KEY', async (err, result)=>{
    //         if(err) { return res.status(403).send('Token verification failed')}
    //         const user = await AuthModel.CheckEmail(result.email)
    //         res.status(200).send(user)
    //     })
         

    // }

    static async Login (req, res)  {
        const {email, password} = req.body
        console.log(email, password)
        const user = await AuthModel.CheckEmail(email)
        if(!email || !password) {return res.status(409).send('Empty fields')}
        if(!user.length) {return res.status(409).send('Email not found')}
        if(!bcrypt.compareSync(password, user[0].password)){return res.status(409).send('Wrong password')}
        const token = await jwt.sign({email}, 'KEY', {expiresIn: '1h'})
        const photos = await AuthModel.GetPhotos(email)
        const result = [...photos, ...user]
        res.cookie('token', token);
        // res.cookie('data', result)
        res.status(200).send('ok')
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
            
            const token = await jwt.sign({email}, 'KEY', {expiresIn: '1h'})
            res.cookie('token', token);
            res.status(200).send('success')


        } catch (e) {res.send('Error ' + e)}
    }

    static LogOut (req, res) {
    res.clearCookie('token')
    res.clearCookie('data')
    res.send('Logout successful');
    }
}

module.exports = AuthController