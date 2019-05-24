import express from 'express'
import authRouter from './endpoints/auth'

const apiRouter = express.Router()

apiRouter.use('/api/v1/',authRouter)

export default apiRouter