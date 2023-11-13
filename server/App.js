const express = require('express')
const { connectToDb } = require('./Config/db.js');
const Router = require('./Routes/Router.js')
const path = require('path');
const cors = require('cors');
const App = express()
App.use(express.json())
App.use(express.urlencoded({ extended: true }));
App.use(express.static(path.join(__dirname, './')));

App.use(cors())
App.use(Router)
const port = 3333

 
 
 
connectToDb()

App.listen(port, ()=>{console.log(`Server open on ${port}`)})










// connectToDb((err)=>{
//     if(!err) {
        
//         db = getDb()
//     } else {
//         console.log('Db connection error ' + err)
//     }
// })




// App.get('/users', async (req, res)=>{
//     const users = await db.collection('users').find({}).toArray();
//     // const users =  await db.collection('users').insertOne({id:2 , name: 'sss'});

//     console.log('All users:', users);
//     res.send(users)
   
//  })
 