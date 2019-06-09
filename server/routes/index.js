import express from 'express'
import authRouter from './auth'
import carsRouter from './cars'
import ordersRouter from './orders'
import flagsRouter from './flags'
const router = express.Router()

router.use('/api/v1/', router)
router.use('/', authRouter)
router.use('/', carsRouter)
router.use('/', ordersRouter)
router.use('/', flagsRouter)
router.get('/', (req, res) => {
    res.send({message : 'Welcome to the AutoMart api feel home'})
})

export default router