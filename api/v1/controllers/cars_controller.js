import CarsModel from '../models/cars'
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
        
    }
    
}
export default carsController