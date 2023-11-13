const multer  = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null,   uuidv4() + file.originalname); 
        },
  });
  



const upload = multer({ storage: storage });
module.exports = upload
