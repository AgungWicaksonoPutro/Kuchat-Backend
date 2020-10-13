const connection = require('../config/db')

const contacts = {
    getFriend: (id) =>{
        return new Promise((resolve, reject) => {
            connection.query(`SELECT contacts.*, profiles.name, profiles.imageUser FROM contacts JOIN profiles ON contacts.idFriend = profiles.idUser WHERE contacts.idUser = ${id}`,(err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}

module.exports = contacts
