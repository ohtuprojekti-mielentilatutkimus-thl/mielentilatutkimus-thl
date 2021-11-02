const logger = require('./logger')

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:', req.path)
    console.log('Body:', req.body)
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
}

module.exports = {
    requestLogger, errorHandler
}