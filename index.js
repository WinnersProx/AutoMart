import express from 'express'
import apiRouter from './server/routes/'
import fileUpload from 'express-fileupload'
import authentication from './server/middlewares/authentication'
const app = express()
const PORT = process.env.PORT || 8000
// some middlewares
app.use(authentication.initialize())
app.use(express.urlencoded({extended : false}))
app.use(fileUpload({
    useTempFiles : true
}))
app.use(apiRouter)

app.listen(PORT, () => {
    console.log(`Automart api server has been started on port:${PORT}`)
})

export default app
