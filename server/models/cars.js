import UserModel from './users'
import AuthValidations from '../middlewares/authValidation'
import userModel from './users';
import dbModel from './db'
class CarsModel {
    errors(){
        return []
    }
    getCars(){
        return db.cars
    }
    createCar(data){
        let newCar = data.body
        let owner = UserModel.getAuthUser
        newCar.id = parseInt(this.getCars().length) + 1
        newCar.created_on = new Date()
        newCar.owner = owner.id
        dbModel.addItems(newCar, 'cars')
        return newCar
    }

    isOwner(userId, car){ // checks if a user is the owner of a car
        return (parseInt(car.owner) === parseInt(userId)) ? true : false
    }
    updateCarPrice(car_id, data){
        let target = dbModel.findbyField('id','cars', parseInt(car_id))
        if(target && this.isOwner(userModel.getAuthUser.id, target)){
            db.cars[target.id - 1].price = data.amount
            return target
        }
        return false
    }
    removeCar(carId){
        carId = parseInt(carId)
        let target = dbModel.findbyField('id','cars',carId)
        if(this.isOwner(userModel.getAuthUser.id, target)){
            db.cars.splice(db.cars[carId - 1], 1)
            return true
        }
        return false
    }

}
const carsModel = new CarsModel()
export default carsModel