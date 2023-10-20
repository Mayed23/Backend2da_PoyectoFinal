const multer = require (`multer`)
const { dirname } = require(`node:path`)


const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, `${dirname(__dirname)}/public/css`)
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer ({
    storage
})

module.exports = { uploader }