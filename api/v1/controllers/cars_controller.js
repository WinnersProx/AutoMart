import CarsModel from '../models/cars'
import carsModel from '../models/cars';
import userModel from '../models/users';
const carsController = {

    createCar : (req, res) => {
        let car = CarsModel.createCar(req.body)
        if(car){
            res.status(200)
            .send({
                status : 200,
                data : car
            })
        }
        else{
            res.status(400)
            .send({
                status : 400 ,
                message : "Unable to save this sale ad"
            })
        }
        
    },
    changeStatus : (req, res) => {
        let car = carsModel.findById(parseInt(req.params.car_id))
        if(car){
            if(carsModel.isOwner(userModel.getAuthUser.id, car)){
                const owner = userModel.findById(car.owner)
                car.status = 'sold'
                car.email = owner.email
                res.status(200).send({ status : 200, data : car})
            }
            else{
                res.status(403).send({ status : 403, error : " You're not authorized to access this location"})
            }
            
        }
        else{
            res.status(404).send({ status : 404, error : "Sorry, the specified post does not exist"})
        }
        
    },
    updatePrice : (req, res) => {
        let car = carsModel.updateCarPrice(req.params.car_id, req.body)
        if(car){
            const owner = userModel.findById(car.owner)
            car.email = owner.email
            res.status(200).send({ status : 200, data : car})
        }
        else{
            res.status(400).send({ status : 400, error : "Sorry, make sure that you're the owner and that the car exist"})
        }
        
    },
    viewCar : (req, res) => {
        let car = carsModel.findById(req.params.car_id)
        res.status(200).send({ status : 200, data : car})
        
    },
    viewCars : (req, res) => {
        let { status, min_price, max_price } = req.query
        let cars = carsModel.getCars()
    
        if(status && !(min_price && max_price)){
            cars = cars.filter((car) => {
                return car.status === status
            })
        }
        else if(min_price && max_price){ 
            cars = cars.filter((car) => {
                return (car.price >= min_price && car.price <= max_price) && car.status === status 
            })
        }
        res.status(200).send({ status : 200, data : cars})
    }
    
}
export default carsController