require ('dotenv').config()

let env = process.env.NODE_ENV

let MONGODB_URI = env === 'production' ? 'mongodb://mielentila_db:27017/mielentila' : 'mongodb://localhost:27017/TESTmielentila'

let EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@helsinki.fi'
let EMAIL_SMTP = env === 'production' ? 'smtp.helsinki.fi' : '127.0.0.1'
// let EMAIL_SMTP = process.env.EMAIL_SMTP || '127.0.0.1'
//let EMAIL_PORT = process.env.EMAIL_PORT || 1025
let EMAIL_PORT = env === 'production' ? 25 : 1025

let FORM_FRONTEND_URI = env === 'production' ? process.env.PUBLIC_URL+'/' : 'http://127.0.0.1:3001/mielentilatutkimus/'
//let FORM_FRONTEND_URI = process.env.FORM_FRONTEND || 'http://127.0.0.1:3001/mielentilatutkimus/'

let ATTACHMENT_MAX_SIZE = process.env.ATTACHMENT_MAX_SIZE || 2 * 1024 * 1024

module.exports = {
    MONGODB_URI,
    EMAIL_FROM,
    EMAIL_SMTP,
    EMAIL_PORT,
    FORM_FRONTEND_URI,
    ATTACHMENT_MAX_SIZE
}