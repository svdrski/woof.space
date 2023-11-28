const express = require('express')
const Router = express.Router()
const AuthController = require('../Controllers/AuthController.js')
const MatchController = require('../Controllers/MatchController.js')
const ChatController = require('../Controllers/ChatController.js')
const ProfileController = require('../Controllers/ProfileController.js')
const upload  = require('../Middlewares/Uploads.js')
const verify = require('../Middlewares/AuthMiddle.js')


Router.get('/users', AuthController.AllUsers)
Router.get('/logout', AuthController.LogOut)
Router.post('/auth', AuthController.Auth)
Router.post('/registration',upload.fields([{ name: 'photos', maxCount: 3 }]), AuthController.Registration)
Router.post('/login', AuthController.Login)

Router.post('/like', MatchController.Like )
Router.post('/dislike', MatchController.disLike )
Router.post('/search/users', MatchController.GetList)

Router.post('/search/matches', MatchController.GetMatches)
Router.post('/chat/users', ChatController.GetOpponents)
Router.post('/profile/update',verify, ProfileController.Update )
Router.post('/profile/get/:id',verify, ProfileController.Get )




module.exports = Router