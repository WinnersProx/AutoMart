import express from 'express'
import ordersController from '../controllers/orders_controller'
import authValidations from '../middlewares/authValidation'
import ordersValidations from '../middlewares/ordersValidations'
const routes = express.Router()

routes
.post('/order', authValidations.isAuthenticated, ordersController.newOrder) 
.patch('/order/:order_id/price', authValidations.isAuthenticated, ordersValidations.checkOrder, ordersController.updatePrice)

export default routes;