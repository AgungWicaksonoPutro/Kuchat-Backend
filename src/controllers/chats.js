const chatModels = require('../models/chats')
const helpers = require('../helpers/response')

const chats = {
    getChatById: (req, res) => {
        const id = req.params.id
            chatModels.getChatById(id)
                .then((result) => {
                    if (result != '') {
                        helpers.response(res, result, 200, null)
                    } else {
                        helpers.response(res, { messages: 'Not Found' }, 200, null)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
    },
    getAllchat: (req, res) => {
        const id = req.query.id
        const sorts = req.query.sort
        const limit = req.query.limit
        chatModels.getAllchat(id, sorts, limit)
            .then((result) => {
                if (result != '') {
                    helpers.response(res, result, 200, null)
                } else {
                    helpers.response(res, { messages: 'Not Found'} , 200, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    updateChat: (req, res) => {
        const id = req.params.id
        const { chat } = req.body
        const data = {
            chat
        }
        chatModels.updateChat(id, data)
            .then((result) => {
                const resultChats = result
                helpers.response(res, resultChats, 200, null)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    deleteChat: (req, res) => {
        const id = req.params.id
        chatModels.deleteChat(id)
            .then((result) => {
                helpers.response(res, result, 200, null)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    insertChat: (req, res) => {
        const { idUser, idSender, chat } = req
        const data = {
            idUser,
            idSender,
        }

        if (req.chat) {
            data.chat = req.chat
        }

        if (req.files) {
            data.imageChat = req.files.map((item) => {
                return process.env.BASE_URL + 'uploads/' + item.filename
            }).join()
        }
        chatModels.insertChat(data)
            .then((result) => {
                console.log(result)
                helpers.response(res, result, 200, null)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = chats
