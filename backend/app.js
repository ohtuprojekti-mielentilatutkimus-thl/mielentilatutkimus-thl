const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const config = require('./utils/config')
const path = require('path')
const admissionsRouter = require('./controllers/admissions')
const testsRouter = require('./controllers/tests')

app.use(cors())
app.use(express.json())

app.use('*/api/admissions', admissionsRouter)

app.use('/thl', express.static('builds/thl/build'))
app.use('/mielentilatutkimus', express.static('builds/mielentilatutkimus/build'))

if (process.env.NODE_ENV === 'test') {
    app.use('*/tests', testsRouter)
}

morgan.token('body', function (req) { return JSON.stringify(req.body) })

const mongoose = require('mongoose')
mongoose.connect(config.MONGODB_URI).then( () => {
    console.log('connected to mongo')}
).catch(() => {
    console.log('error connecting')
})

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(':method :url :status :response-time ms :body'))
}

// Nämä pitää määritellä routereiden jälkeen
app.get('/thl/*', (req, res) => res.sendFile(path.resolve('builds', 'thl', 'build', 'index.html')))
app.get('/mielentilatutkimus/*', (req, res) => res.sendFile(path.resolve('builds', 'mielentilatutkimus', 'build', 'index.html')))

module.exports = app