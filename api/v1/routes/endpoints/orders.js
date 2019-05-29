import express from 'express'
import ordersController from '../../controllers/orders_controller'
import authValidations from '../../middlewares/authValidation'
import ordersValidations from '../../middlewares/ordersValidations'
const routes = express.Router()
// hence we'll be using custom middlewares to handle all user requests
// routes
.post('/order', authValidations.isAuthenticated, ordersController.newOrder) //create a car sale ad
// .post('/order/:order-id/price', authValidations.isAuthenticated, carsController.createCar)

export default routes;