const express = require('express')
const contactController = require('../controllers/contacts')
const router = express.Router()
const auth = require('../middlewares/auth')

router
    .get('/:id', contactController.getContactById)

module.exports = router
