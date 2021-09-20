require ('dotenv').config()

let env = process.env.NODE_ENV

let MONGODB_URI = env === 'prod' ? 'mongodb://mielentila_db:27017/mielentila' : 'mongodb://localhost:27017/mielentila'

module.exports = {
    MONGODB_URI
}
