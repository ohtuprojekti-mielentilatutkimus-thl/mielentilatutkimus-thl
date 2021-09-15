
const admissionsRouter = require('express').Router()
const Form = require('../models/form.model.js')


admissionsRouter.get('/', async (req, res) => {
    
    const data = await Form.find({})
    res.json(data.map(data => data.toJSON()))
})


admissionsRouter.post('/', async (req, res) => {
    const data = req.body
    console.log('req body: ')
    console.log(data)
    console.log('------')

    const form = new Form({
        hello: data.hello  
    })
    const savedForm = await form.save()
    res.json(savedForm.toJSON())
})

module.exports = admissionsRouter