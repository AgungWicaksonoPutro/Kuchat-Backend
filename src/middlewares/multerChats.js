const multer = require('multer')
const path = require('path')
const helpers = require('../helpers/response')

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

function upload(req, res, next) {
    const uploadFiles = multer({
        storage: storage,
        limits: { fileSize: 1000000 },
        fileFilter: function (req, file, cb) {
            const extFile = path.extname(file.originalname)
            if (extFile !== '.jpg') {
                cb('jpg Only!', false)
            } else {
                cb(null, true)
            }
        }
    }).array('imageChat', 2)

    uploadFiles(req, res, function (err) {
        if (err) {
            if (err == 'jpg Only!') {
                return helpers.response(res, {messages: 'JPG Only'}, 202, null)
            } else {
                return helpers.response(res, {messages: 'File Large'}, 202, null)
            }
        } else {
            next()
        }
    })
}

module.exports = {
    upload
}
