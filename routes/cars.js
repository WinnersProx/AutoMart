import express from 'express'
import carsController from '../controllers/cars_controller'
import authValidations from '../middlewares/authValidation'
import carsValidations from '../middlewares/carsValidations'
const routes = express.Router()
// hence we'll be using custom middlewares to handle all user requests
routes
.post('/car', authValidations.isAuthenticated, carsController.createCar) //create a car sale ad
.patch('/car/:car_id/status', authValidations.isAuthenticated, carsController.changeStatus)  // mark a posted car as sold
.patch('/car/:car_id/price', authValidations.isAuthenticated, carsController.updatePrice)  // update the price of a posted car
.get('/car/:car_id' , carsValidations.exists, carsController.viewCar)
.get('/car' , carsController.viewCars)
.delete('/car/:car_id', authValidations.isAuthenticated, carsValidations.exists, carsController.deleteCar)
export default routes;