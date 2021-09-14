const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mielentila')

app.use(express.json())
//app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({message: 'moi maailma'})
    //res.send('<h1>Testi</h1>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

const Form = require('./models/form.model.js')
app.post('/', async (req, res) => {
    const data = req.body
    const form = new Form({
        hello: data.hello
    })
    const savedForm = await form.save()
    res.json(savedForm.toJSON())
})


