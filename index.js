const express = require('express')
const app = express()
const PORT = 8000 || process.env.PORT

app.get('', (req, res) => {
    res.send('Welcome')
})
.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen(PORT, () => {
    console.log(`Automart api server has been started on port:${PORT}`)
})