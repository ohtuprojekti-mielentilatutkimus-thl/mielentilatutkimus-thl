const app = require('./app')


const http = require('http')
const server = http.createServer(app)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

