const admissionsRouter = require('express').Router()
const Form = require('../models/form.model.js')

admissionsRouter.get('/', async (req, res) => {
    
    const data = await Form.find({})
    res.json(data.map(data => data.toJSON()))
})

