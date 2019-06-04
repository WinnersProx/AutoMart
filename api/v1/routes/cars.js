import express from 'express'
import carsController from '../controllers/cars_controller'
import authValidations from '../middlewares/authValidation'
const routes = express.Router()
// hence we'll be using custom middlewares to handle all user requests
routes
.post('/car', authValidations.isAuthenticated, carsController.createCar) //create a car sale ad
.patch('/car/:car_id/status', authValidations.isAuthenticated, carsController.changeStatus)  // mark a posted car as sold
// .patch('/car/:car-id/price', authValidations.isAuthenticated, carsController.createCar)  // update the price of a posted car
// .get('/car/:car-id/status', authValidations.isAuthenticated, carsController.createCar)  // view a specific car
// .get('/car', authValidations.isAuthenticated, carsController.createCar)  // view all unsold car
// // User can also view all unsold cars within a price range using queryStrings can also View all posted ads whether sold or available without any parameters
// .delete('/car/:car-id', authValidations.isAuthenticated, carsController.createCar) // delete a posted car ad
// .post('/flag', authValidations.isAuthenticated, carsController.createCar) // flag or report a posted AD as fraudulent.
// GET car?status=available&state=new View all unsold cars of a specific make (manufacturer)
// GET /car?status=available&state=used View all unsold cars of a specific make (manufacturer).
// GET /car?status=available&manufacturer= XXXValue View all unsold cars of a specific make (manufacturer).
// GET /car?body_type= bodyType View all cars of a specific body type.
export default routes;