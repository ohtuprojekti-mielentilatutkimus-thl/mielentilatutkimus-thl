const logRouter = require('express').Router()
const Log = require('../models/log.model')

logRouter.get('/', async (req,res) => {
    const log = await Log.find({})
    res.json(log.map((log) => log.toJSON()))
})

logRouter.get('/form_event/:id', async (req, res) => {
    const log = await Log.find({'form_id': req.params.id})
    res.json(log.map((log) => log.toJSON()))
})

module.exports = logRouter