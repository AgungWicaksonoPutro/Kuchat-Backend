const express = require('express')
const contactController = require('../controllers/contacts')
const router = express.Router()
const auth = require('../middlewares/auth')

router
    .get('/:id', contactController.getContactById)
    .get('/', contactController.getAllContact)

module.exports = router
