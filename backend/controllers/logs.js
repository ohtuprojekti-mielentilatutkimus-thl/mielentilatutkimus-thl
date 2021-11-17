const logRouter = require('express').Router()
const Log = require('../models/log.model')

logRouter.get('/', async (req,res) => {
    const log = await Log.find({})
    res.json(log.map((log) => log.toJSON()))
})

module.exports = logRouter