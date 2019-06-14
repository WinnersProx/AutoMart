import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import apiRouter from './server/routes/'
import fileUpload from 'express-fileupload'
const app = express()
const PORT = process.env.PORT || 8000
// some middlewares

app.use(express.urlencoded({extended : false}))
app.use((req, res, next) => {
	if(res.status === 500)
		res.status(500).send({ status : 500, message : 'Server error!'})
	next()
})
app.use(fileUpload({
    useTempFiles : true
}))
app.use(apiRouter)

app.listen(PORT, () => {
    console.log(`Automart api server has been started on port:${PORT}`)
})

// app.get('**', (req, res) => {
// 	res.status(404).send({ status : 404, message : 'Page not found!'})
// })

export default app
