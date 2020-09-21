const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads-img')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    }
  }

upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter
})

module.exports = {
    upload
}