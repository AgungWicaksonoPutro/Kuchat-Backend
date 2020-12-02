require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const server = http.createServer(app)
const io = socket(server)
const cors = require('cors')
const routers = require('./src/routes/index')
const controllerChat = require('./src/models/chats')
const user = require('./src/controllers/users')
const userStatus = require('./src/models/users')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

io.on('connection', socket =>{
    console.log('client connect')
    socket.on('UserLogin', id => {
        const status = 'Online'
        socket.join('user:' + id.id)
        socket.broadcast.emit('status', { id: id.id, status: status })
        userStatus.updateUser(id.id, {status: status})
    })
    socket.on('sendMessage', (data, callback)=>{
        const Message = {}
        Message.chat = data.chat
        Message.idSender = data.idSender
        Message.idContact = data.idContact
        Message.createAt = data.createAt
        callback(data)
        console.log(data.idReceiver)
        controllerChat.insertChat(Message)
        .then((result)=>{
            io.to('user:' + data.idReceiver).emit('receiveMessage', data)
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    socket.on('logOut', id =>{
        userStatus.updateUser(id.id, { status: new Date() })
    })
    socket.on('disconnect', () => {
        console.log('user left')
    });
})


app.use('/api/v1/kuchat/', routers)
app.use('/uploads', express.static('./uploads-img'))
const PORT = process.env.PORT
server.listen(PORT, ()=>{
    console.log(`Server On Going!`)
})