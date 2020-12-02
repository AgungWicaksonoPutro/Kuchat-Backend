const connection = require('../config/db')

const user = {
    register: (data) => {
        return new Promise((resolve, reject)=>{
            connection.query('INSERT INTO profiles SET ?', data, (err, result)=>{
                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getUser: (email) => {
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM profiles WHERE email = ?', email, (err, result)=>{
                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getUserById: (id) => {
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM profiles WHERE idUser = ?', id , (err, result)=>{
                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getAllUser: () => {
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM profiles', (err, result)=>{
                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateUser: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE profiles SET ? WHERE idUser = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}

module.exports = user