import express from 'express'
import authRouter from './auth'
import carsRouter from './cars'
import ordersRouter from './orders'
const router = express.Router()

router.use('/api/v1/', router)
router.use('/', authRouter)
router.use('/', carsRouter)
router.use('/', ordersRouter)

export default router