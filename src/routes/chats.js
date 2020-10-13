const express = require('express')
const chatController = require('../controllers/chats')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const chatImage = require('../middlewares/multerChats')
const router = express.Router()

router
    .get('/:id', chatController.getChatById)
    .get('/', chatController.getAllchat)
    .post('/', auth.verifyAccsess, chatImage.upload, chatController.insertChat)
    .patch('/:id', auth.verifyAccsess, multer.upload.single('imageUser'), chatController.updateChat)
    .delete('/:id', auth.verifyAccsess, chatController.deleteChat)

module.exports = router