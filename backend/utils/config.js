require ('dotenv').config()

let env = process.env.NODE_ENV

let MONGODB_URI = env === 'production' ? 'mongodb://mielentila_db:27017/mielentila' : 'mongodb://127.0.0.1/TESTmielentila'

let EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@helsinki.fi'
let EMAIL_SMTP = env === 'production' ? 'smtp.helsinki.fi' : '127.0.0.1'
let EMAIL_PORT = env === 'production' ? 25 : 1025

let FORM_FRONTEND_URI = env === 'production' ? process.env.PUBLIC_URL+'/' : 'http://127.0.0.1:3001/mielentilatutkimus/'

let ATTACHMENT_MAX_SIZE = process.env.ATTACHMENT_MAX_SIZE || 2 * 1024 * 1024

let ALLOWED_SENDER_EMAIL_DOMAIN = env === 'production' ? process.env.ALLOWED_SENDER_EMAIL_DOMAIN_PROD || ['helsinki.fi', 'cs.helsinki.fi', 'thl.fi', 'oikeus.fi']
    : process.env.ALLOWED_SENDER_EMAIL_DOMAIN_TEST || ['helsinki.fi', 'cs.helsinki.fi', 'thl.fi', 'oikeus.fi', 'example.com', 'asianajotoimisto.fi']

let ALLOWED_SENDER_EMAIL_DOMAIN_POLICE = env === 'production' ? process.env.ALLOWED_SENDER_EMAIL_DOMAIN_POLICE_PROD || ['poliisi.fi']
    : process.env.ALLOWED_SENDER_EMAIL_DOMAIN_POLICE_TEST || ['poliisi.fi']

let TOKEN_SECRET = process.env.TOKEN_SECRET || 'DO_NOT_USE_THIS_=D'

    
module.exports = {
    MONGODB_URI,
    EMAIL_FROM,
    EMAIL_SMTP,
    EMAIL_PORT,
    FORM_FRONTEND_URI,
    ATTACHMENT_MAX_SIZE,
    ALLOWED_SENDER_EMAIL_DOMAIN,
    ALLOWED_SENDER_EMAIL_DOMAIN_POLICE,
    TOKEN_SECRET
}