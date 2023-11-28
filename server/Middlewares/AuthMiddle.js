const jwt = require("jsonwebtoken");
const {AuthModel} = require('../Models/AuthModel.js')

function verify ( req, res, next) {

    console.log('SOMEONE CONNECT')
    const token = req.cookies.token;

    // const token =  req.headers["authorization"];
    if(!token) {return res.status(401).send('Unauthorized')}
        jwt.verify(token, 'KEY', async (err, res)=>{
            if(err) { return res.status(403).send('Token verification failed')}
            const user = await AuthModel.CheckEmail(res.email)
            
            if(user) {
                next()
                return

            }  else  { 
                return res.status(404).send('User Not Found')
            }
    })
}

module.exports = verify