require('dotenv').config()
const bcrypt = require('bcryptjs')
const modelUsers = require('../models/users')
const helpers = require('../helpers/response')
const jwt = require('jsonwebtoken')

const users = {
    register: (req, res)=>{
        const{ name, email, password } = req.body
        const data = {
            name,
            email,
            bio: `I'am ready on kuchat`,
            password,
            createAt: new Date(),
            updateAt: new Date
        }
        if(req.file){
            data.imageUser = `http://localhost:3400/uploads/${req.file.filename}`
        }
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(data.password, salt, function(err, hash){
                modelUsers.getUser(data.email)
                .then((result)=>{
                    const user = result[0] || 0
                    if(data.email === user.email) return helpers.response(res, {message : 'Email Ready!'}, 200, null)
                    data.password = hash
                    modelUsers.register(data)
                        .then((result)=>{
                            helpers.response(res, result, 200, null)
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                })
            })
        })
    },
    login: (req, res)=>{
        const {email, password} = req.body
        modelUsers.getUser(email)
        .then((result)=>{
            if(result.length<1) return helpers.response(res, {message: 'Email Not Found!'}, 401, null)
            const user = result[0]
            const hash = user.password
            bcrypt.compare(password, hash).then((resCompare)=>{
                if(!resCompare) return helpers.response(res, {message: 'Password Wrong!'}, 401, null)
                const payload = {
                    id: user.idUser,
                    email: user.email,
                }
                jwt.sign(payload, process.env.SECRET, {expiresIn: '12h'}, (err, token)=>{
                    user.token = token
                    delete user.password
                    delete user.createAt
                    delete user.updateAt
                    helpers.response(res, user, 200)
                })
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    getUserById: (req, res) => {
        const id = req.params.id
        modelUsers.getUserById(id)
            .then((result)=>{
                if(result != ''){
                    helpers.response(res, result, 200, null)
                } else {
                    helpers.response(res, {message: 'Not Found'}, 404, null)
                }
            })
            .catch((err) => {
                console.log(err)
              })
    },
    updateUser: (req, res) => {
        const id = req.params.id
        const { name, email, bio } = req.body
        const data = {
            name, 
            email, 
            bio,
            updateAt: new Date()
        }
        if (req.file) {
            data.imageUser = `http://localhost:3400/uploads/${req.file.filename}`
        }
        console.log(data)
        modelUsers.updateUser(id, data)
            .then((result) => {
                const resultChats = result
                helpers.response(res, resultChats, 200, null)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = users