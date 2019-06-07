import express from 'express'
import flagsController from '../controllers/flags_controller'
import Validations from '../middlewares/authValidation'
import carsValidations from '../middlewares/carsValidations'
const routes = express.Router()
// hence we'll be using customized middlewares to validate all the auth requests
routes
.post('/flag/:car_id', Validations.isAuthenticated, carsValidations.exists, flagsController.newFlag)
export default routes;