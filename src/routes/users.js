const express = require('express');
const router = express.Router()
const controllerUsers = require('../controllers/users')
const multer = require('../middlewares/multer')

router
    .post('/login', controllerUsers.login)
    .post('/register', multer.upload.single('imageUser'), controllerUsers.register)
    .get('/:id', controllerUsers.getUserById)
    .patch('/:id', multer.upload.single('imageUser'), controllerUsers.updateUser)

module.exports = router