const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Terve</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})