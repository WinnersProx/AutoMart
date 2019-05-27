import express from 'express'
import carsController from '../../controllers/cars_controller'
import authValidations from '../../middlewares/authValidation'
const routes = express.Router()
// hence we'll be using custom middlewares to handle all user requests
routes
.post('/order', authValidations.isAuthenticated, carsController.createCar) //create a car sale ad
.post('/order/:order-id/price', authValidations.isAuthenticated, carsController.createCar)

export default routes;