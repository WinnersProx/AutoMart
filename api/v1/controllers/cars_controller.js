import carsModel from '../models/cars'
import userModel from '../models/users'
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
        let car = carsModel.updateCarStatus(req.params.car_id)
        
        if(car){
            const owner = userModel.findById(car.owner)
            car.email = owner.email
            res.status(200).send({ status : 200, data : car})
        }
        else{
            res.status(400).send({ status : 400, error : "Sorry, make sure that you're the owner and that the car exist"})
        }
        
    }
    
}
export default carsController