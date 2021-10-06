const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const config = require('./utils/config')
const path = require('path')

app.use(cors())

app.use('/thl', express.static('builds/thl/build'))
app.use('/mielentilatutkimus', express.static('builds/mielentilatutkimus/build'))

morgan.token('body', function (req) { return JSON.stringify(req.body) })

const admissionsRouter = require('./controllers/admissions')

const mongoose = require('mongoose')
mongoose.connect(config.MONGODB_URI).then( () => {
    console.log('connected to mongo')}
).catch(() => {
    console.log('error connecting')
})

//mongoose.connect('mongodb://localhost:27017/mielentila')

app.use(express.json())
//app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(':method :url :status :response-time ms :body'))
}

app.use('/api/admissions', admissionsRouter)

// Tämän täytyy (ehkä) olla kaikkien routereiden jälkeen
app.get('/thl/*', (req, res) => res.sendFile(path.resolve('builds', 'thl', 'build', 'index.html')))
app.get('/mielentilatutkimus/*', (req, res) => res.sendFile(path.resolve('builds', 'mielentilatutkimus', 'build', 'index.html')))

module.exports = app
