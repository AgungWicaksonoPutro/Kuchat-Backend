const express = require('express')
const app = express()
const { env }  = require('process')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)
const routers = require('./src/routes/index')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/api/v1/kuchat/', routers)
app.use('/uploads', express.static('./uploads-img'))

io.on('connection', socket =>{
    console.log('client connect')
    socket.on('setupUserLogin', data =>{
        console.log('user baru join adalah ' + data.id)
        socket.join('user:'+data.id)
        socket.broadcast.to(data.room).emit('notif', 'both: user join... ' + data.username)
    })

    socket.on('disconect', ()=>{
        console.log('user disconect')
    })
})


const PORT = process.env.PORT
server.listen(PORT, ()=>{
    console.log(`Server On Going!`)
})