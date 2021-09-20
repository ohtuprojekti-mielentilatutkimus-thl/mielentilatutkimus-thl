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
//mongoose.connect('mongodb://localhost:27017/mielentila')

app.use(express.json())
//app.use(express.urlencoded({ extended: true }))

app.use(morgan(':method :url :status :response-time ms :body'))

app.use('/', admissionsRouter)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

/*
const Form = require('./models/form.model.js')

app.get('/', async (req, res) => {
    
    const data = await Form.find({})
    res.json(data.map(data => data.toJSON()))
})

app.post('/', async (req, res) => {
    const data = req.body
    const form = new Form({
        hello: data.hello
    })
    const savedForm = await form.save()
    res.json(savedForm.toJSON())
})
*/

