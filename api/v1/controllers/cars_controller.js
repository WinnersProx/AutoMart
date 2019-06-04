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
        
    }
    
}
export default carsController