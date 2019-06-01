import express from 'express'
import ordersController from '../controllers/orders_controller'
import authValidations from '../middlewares/authValidation'
import ordersValidations from '../middlewares/ordersValidations'
const routes = express.Router()

routes
.post('/order', authValidations.isAuthenticated, ordersController.newOrder) 
// .post('/order/:order-id/price', authValidations.isAuthenticated, carsController.createCar)

export default routes;