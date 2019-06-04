import UserModel from './users'
import AuthValidations from '../middlewares/authValidation'
import userModel from './users';
let carsStock = [
    {
        id : 0 ,
        owner : 0,
        created_on : new Date() ,
        manufacturer : "Toyota" ,
        model : "Mercedess Benz" ,
        price : 80000.00 ,
        state : "Used" ,
        status : "available" ,
        body_type : "Car"
    },
    {
        id : 0 ,
        owner : 0,
        created_on : new Date() ,
        manufacturer : "Be Forward" ,
        model : "Obama V8" ,
        price : 150000.00 ,
        state : "Used" ,
        status : "sold" ,
        body_type : "Car"
    }
]
class CarsModel {
    errors(){
        return []
    }
    getCars(){
        return carsStock
    }
    createCar(newCar){
        let owner = UserModel.findById(process.env.UTOKEN.split('.')[0])
        newCar.id = parseInt(this.getCars().length)
        newCar.created_on = new Date()
        newCar.owner = owner.id
        carsStock = [...carsStock, newCar]
        newCar.email = owner.email
        return newCar
    }
    
    findById(carId){
        carId = parseInt(carId)
        return this.getCars().find((found) => {
            return found.id === carId
        })
    }

    isOwner(userId, car){ // checks if a user is the owner of a car
        return (parseInt(car.owner) === parseInt(userId)) ? true : false
    }
    updateCarPrice(car_id, data){
        let target = this.findById(parseInt(car_id))
        if(target && this.isOwner(userModel.getAuthUser.id, target)){
            target.price = data.amount
            return target
        }
        return false
    }
    removeCar(carId){
        carId = parseInt(carId)
        let target = this.findById(carId)
        if(this.isOwner(userModel.getAuthUser.id, target)){
            carsStock.splice(carsStock[carId], 1)
            return true
        }
        return false
    }

}
const carsModel = new CarsModel()
export default carsModel