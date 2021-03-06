const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const config = require('./utils/config')
const path = require('path')
require('express-async-errors')

const mongoose = require('mongoose')
//mongoose.plugin(require('./utils/diff-plugin'))

const admissionsNotLoggedInRouter = require('./controllers/admissionsNotLoggedin')
const attachmentsNotLoggedInRouter = require('./controllers/attachmentsNotLoggedIn')
const admissionsRouter = require('./controllers/admissions')
const basicInformationsRouter = require('./controllers/basicInformations')
const attachmentsRouter = require('./controllers/attachments')
const authRouter = require('./controllers/auth')
const testsRouter = require('./controllers/tests')
const logRouter = require('./controllers/logs')
const middleware = require('./utils/middlewares')

app.use(cors())
app.use(express.json())

app.use('*/api/admissions', admissionsNotLoggedInRouter)
app.use('*/api/admissions', attachmentsNotLoggedInRouter)
app.use('*/api/admissions', basicInformationsRouter)

//must be here, before rest of the admission routers
app.use('*/api/thl/admissions', middleware.authJwt.verifyToken)

app.use('*/api/thl/admissions', admissionsRouter)
app.use('*/api/thl/admissions', attachmentsRouter)

app.use('*/api/thl/auth', authRouter)
app.use('*/api/thl/log', logRouter)

app.use('/thl', express.static('builds/thl/build'))
app.use('/mielentilatutkimus', express.static('builds/mielentilatutkimus/build'))

if (process.env.NODE_ENV === 'test') {
    app.use('*/tests', testsRouter)
}

app.use(middleware.errorHandler)

morgan.token('body', function (req) { return JSON.stringify(req.body) })

mongoose.connect(config.MONGODB_URI).then( () => {
    console.log('connected to mongo')}
).catch(() => {
    console.log('error connecting')
})


if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(':method :url :status :response-time ms :body'))
}

app.get('/thl/*', (req, res) => res.sendFile(path.resolve('builds', 'thl', 'build', 'index.html')))
app.get('/mielentilatutkimus/*', (req, res) => res.sendFile(path.resolve('builds', 'mielentilatutkimus', 'build', 'index.html')))

module.exports = app