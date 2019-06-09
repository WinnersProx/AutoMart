import CarsModel from '../models/cars'
import carsModel from '../models/cars';
import userModel from '../models/users';
import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name : 'wintech',
    api_key    : '642253245865461',
    api_secret : 'Aa8XsavnLhmh4wu2MZYpubkCDro'
})

const carsController = {

    createCar : (req, res) => {
        let car = CarsModel.createCar(req)
        if(car){
            carsController.uploadFiles(req, res, car)
        }
        else{
            res.status(400)
            .send({
                status : 400 ,
                message : "Unable to save this sale ad"
            })
        }
        
    },
    uploadFiles(req,res,car){
        let files = !req.files ? null : req.files.pictures
        car.pictures = []
        if(files){
            cloudinary.uploader.upload(files.tempFilePath, (result, err) => {
                car.pictures.push({url : result})
                if(!err){
                    res.status(201)
                    .send({
                        status : 201,
                        data : car
                    })
                }
            })
        }
        else{
            res.status(201)
            .send({
                status : 201,
                data : car
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
        let { status, min_price, max_price, state, manufacturer, body_type} = req.query
        // this is to ensure that all posted ads are available when we have GET /car without any param nor a query
        let cars = carsModel.getCars() 
        if(status){
            cars = cars.filter((car) => {
                return car.status === status
            })
        }
        if(status &&(min_price && max_price)){ 
            cars = cars.filter((car) => {
                return (car.price >= min_price && car.price <= max_price) && car.status === status 
            })
        }
        if(status && state){
            cars = cars.filter((car) => {
                return car.state === state && car.status === status 
            })
        }
        if(status && manufacturer){
            cars = cars.filter((car) => {
                return car.manufacturer === manufacturer && car.status === status 
            })
        }
        if(body_type){
            cars = cars.filter((car) => {
                return car.body_type === body_type
            })
        }
        res.status(200).send({ status : 200, data : cars})
    },
    deleteCar : (req, res) => {
        if(carsModel.removeCar(req.params.car_id))
            res.status(200).send({status : 200, data : "Car Ad successfully deleted"})
        else
            res.status(403).send({status : 403, data : "You are forbidden to perform this action"})
    }
    
}
export default carsController