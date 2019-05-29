import express from 'express'
import apiRouter from './v1/routes/'
const app = express()
const PORT = 8000 || process.env.PORT
// some middlewares
app.use(express.urlencoded({extended : false}))
// cross origin resource security(CORS) handler


app.get('/', (req, res) => {
    res.send('Welcome to the AutoMart api')
})
app.use(apiRouter)

app.listen(PORT, () => {
    console.log(`Automart api server has been started on port:${PORT}`)
})

export default app
