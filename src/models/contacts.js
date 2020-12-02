const connection = require('../config/db')

const contacts = {
    getFriend: (id) =>{
        return new Promise((resolve, reject) => {
            connection.query(`SELECT contacts.* FROM contacts WHERE contacts.id = ${id}`,(err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getAllFriend: () =>{
        return new Promise((resolve, reject) => {
            connection.query(`SELECT contacts.* FROM contacts`,(err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

}

module.exports = contacts
