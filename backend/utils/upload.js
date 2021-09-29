const util = require('util')
const multer = require('multer')
const config = require('./config')

const storage = multer.memoryStorage()
const uploadFile = multer({
    storage: storage,
    limits: { fileSize: config.ATTACHMENT_MAX_SIZE }
}).single('file')

const uploadMiddleware = util.promisify(uploadFile)
module.exports = uploadMiddleware