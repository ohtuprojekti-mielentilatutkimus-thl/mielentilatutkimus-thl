const jwt = require('jsonwebtoken')
const config = require('../utils/config.js')
const authRouter = require('express').Router()

authRouter.post('/login', async (req, res) => {

    var token = jwt.sign({ username: req.body.username, role: req.body.role }, config.TOKEN_SECRET, { expiresIn: 60*60 })
    res.status(200).send({username: req.body.username, role: req.body.role, accessToken: token })
})

module.exports = authRouter
