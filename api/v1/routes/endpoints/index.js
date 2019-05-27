import express from 'express'
import authRouter from './auth'
import carsRouter from './cars'

const router = express.Router()
router.use('/', authRouter)
router.use('/', carsRouter)

export default router