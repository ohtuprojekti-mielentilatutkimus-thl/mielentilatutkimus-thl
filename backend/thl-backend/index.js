const express = require('express')
const app = express()
app.use(express.static('build'))
const cors = require('cors')
const morgan = require('morgan')
const config = require('./utils/config')

app.use(cors())

morgan.token('body', function (req) { return JSON.stringify(req.body) })

const admissionsRouter = require('./controllers/admissions')

const mongoose = require('mongoose')
mongoose.connect(config.MONGODB_URI)

app.use(express.json())

app.use(morgan(':method :url :status :response-time ms :body'))

app.use('/', admissionsRouter)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

