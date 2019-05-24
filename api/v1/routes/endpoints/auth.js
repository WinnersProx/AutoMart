import express from 'express'
import authController from '../../controllers/auth_controller'

const authRouter = express.Router()
// hence we'll be using custom middlewares to validate all the user requests
authRouter
.post('/auth/signup', authController.signup)
.post('/auth/signin', authController.signin)

export default authRouter;