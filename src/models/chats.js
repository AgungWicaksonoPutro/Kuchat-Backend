const connection = require('../config/db')

const chats = {
    getChatById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT chats.*, profiles.imageUser, profiles.name, profiles.createAt, profiles.status, contacts.* FROM chats JOIN profiles ON chats.idSender = profiles.idUser JOIN contacts ON chats.idContact = contacts.id WHERE idSender = ${id} ORDER BY chats.createAt DESC`,(err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    getAllchat: (id, sort, limit) => {
        let message = ''
        let sortMessage = ''
        let limits = ''

        if (id) {
            message = `WHERE chats.idContact=${id}`
        }

        if (sort) {
            sortMessage = `ORDER BY chats.createAt ${sort}`
        }

        if (limit) {
            limits = `LIMIT ${limit}`
        }

        return new Promise((resolve, reject) => {
            connection.query(`SELECT chats.*, profiles.imageUser, profiles.name, profiles.createAt, profiles.status, contacts.* FROM chats JOIN profiles ON chats.idSender = profiles.idUser JOIN contacts ON chats.idContact = contacts.id ${message} ${sortMessage} ${limits}`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    updateChat: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE chats SET ? WHERE id = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    deleteChat: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM chats WHERE id = ?', id, (err, result) => {
                if (!err) {
                    if (result != '') {
                        connection.query('DELETE FROM chats WHERE id = ?', id, (err, result) => {
                            if (!err) {
                                resolve(result)
                            } else {
                                reject(new Error(err))
                            }
                        })
                    } else {
                        resolve('Message not found')
                    }
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    insertChat: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO chats SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}

module.exports = chats
