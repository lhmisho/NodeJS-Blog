let multer  = require('multer')
let path = multer.path('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.fieldname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  