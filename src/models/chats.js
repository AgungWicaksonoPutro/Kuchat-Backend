const connection = require('../config/db')

const chats = {
    getChatById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM chats WHERE idSender = ?`, id ,(err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    getAllchat: (idSender, sort, limit) => {
        let message = ''
        let sortMessage = ''
        let limits = ''

        if (idSender) {
            console.log(idSender)
            message = `WHERE chats.idReceiver=${idSender}`
        }

        if (sort) {
            sortMessage = `ORDER BY ${sort} DESC`
        }

        if (limit) {
            console.log(limit)
            limits = `LIMIT ${limit}`
        }

        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM chats ${message} ${sortMessage} ${limits}`, (err, result) => {
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
