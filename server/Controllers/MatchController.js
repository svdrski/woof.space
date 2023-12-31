const MatchModel = require('../Models/MatchModel.js')
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_KEY


class MatchController {

    static Like(req, res) {
        try{
            const {user, opponent} = req.body
            const resp = MatchModel.like(user, opponent)
        } catch (e) {res.send('Error ' + e)}
       
    }

    static disLike (req, res) {
        try{
            const {user, opponent} = req.body
            const resp = MatchModel.disLike(user, opponent)
        } catch (e) {res.send('Error ' + e)}
       
    }

    static GetList (req, res){
        try{
            const {gender, breed, age, city} = req.body
            const token = req.cookies.token
            jwt.verify(token, `${KEY}` ,async (err, decoded)=>{
                if(err){return res.status(401).send('Auth failed')}
                const users = await MatchModel.getList(decoded.email, gender, breed, age, city)
                res.status(201).send(users)
            })
        } catch (e) {res.send('Error ' + e)}
       
    }

    static GetMatches (req, res) {
        try{
            const token = req.cookies.token
            jwt.verify(token, `${KEY}` ,async (err, decoded)=>{
                if(err){return res.status(401).send('Auth failed')}
                const users = await MatchModel.getMatches(decoded.email)
                res.status(201).send(users)
            })
        } catch (e) {res.send('Error ' + e)}
       
    }
}

module.exports = MatchController