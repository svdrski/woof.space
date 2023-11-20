const MatchModel = require('../Models/MatchModel.js')
const jwt = require('jsonwebtoken')


class MatchController {

    static Like(req, res) {
        const {user, opponent} = req.body
        const resp = MatchModel.like(user, opponent)
    }

    static disLike (req, res) {
        const {user, opponent} = req.body
        const resp = MatchModel.disLike(user, opponent)
    }

    static GetList (req, res){
        const {gender, breed, age} = req.body
        const token = req.cookies.token
        jwt.verify(token, 'KEY',async (err, decoded)=>{
            if(err){return res.status(401).send('Auth failed')}
            const users = await MatchModel.getList(decoded.email, gender, breed, age)
            res.status(201).send(users)
        })
    }

    static GetMatches (req, res) {
        const token = req.cookies.token
        jwt.verify(token, 'KEY',async (err, decoded)=>{
            if(err){return res.status(401).send('Auth failed')}
            const users = await MatchModel.getMatches(decoded.email)
            res.status(201).send(users)
        })
    }
}

module.exports = MatchController