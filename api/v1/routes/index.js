import express from 'express'
import routes from './endpoints'

const router = express.Router()

router.use('/api/v1/',routes)

export default router