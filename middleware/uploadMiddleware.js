let multer  = require('multer')
let path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  let upload = multer({
       storage: storage,
       limits: {
           fileSize: 1024 * 1024 * 5
       },
       fileFilter: (req, file, cb) => {
            const types = /jpeg|jpg|png|gif/;
            const extname = types.test(path.extname(file.originalname).toLowerCase());
            const mimetype = types.test(file.mimetype);
            if(mimetype && extname){
                return cb(null,true);
              } else {
                cb('Error: Images Only!');
              }
       }
    })

    module.exports = upload