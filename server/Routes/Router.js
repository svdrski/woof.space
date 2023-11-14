const express = require('express')
const Router = express.Router()
const AuthController = require('../Controllers/AuthController.js')
const upload  = require('../Middlewares/Uploads.js')


Router.get('/users', AuthController.AllUsers)
Router.get('/logout', AuthController.LogOut)
Router.post('/auth', AuthController.Auth)
Router.post('/registration',upload.fields([{ name: 'photos', maxCount: 3 }]), AuthController.Registration)
Router.post('/login', AuthController.Login)



module.exports = Router