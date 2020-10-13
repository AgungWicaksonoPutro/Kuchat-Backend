const express = require('express')
const route = express.Router()
const usersRouter = require('./users')
const contactRouters = require('./contacts')
const chatsRouters = require('./chats')

route
    .use('/users', usersRouter)
    .use('/contacts', contactRouters)
    .use('/chats', chatsRouters)
module.exports = route