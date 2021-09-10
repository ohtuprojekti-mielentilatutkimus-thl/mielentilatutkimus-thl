const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())


app.get('/', (req, res) => {
    res.send('<h1>Testi</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
