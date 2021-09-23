require ('dotenv').config()

let env = process.env.NODE_ENV

let MONGODB_URI = env === 'prod' ? 'mongodb://mielentila_db:27017/mielentila' : 'mongodb://localhost:27017/TESTmielentila'

let EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@helsinki.fi'
let EMAIL_SMTP = process.env.EMAIL_SMTP || '127.0.0.1'
let EMAIL_PORT = process.env.EMAIL_PORT || 25

let FORM_FRONTEND_URI = process.env.FORM_FRONTEND || 'http://127.0.0.1:3001/mielentilatutkimus/'

module.exports = {
    MONGODB_URI,
    EMAIL_FROM,
    EMAIL_SMTP,
    EMAIL_PORT,
    FORM_FRONTEND_URI
}