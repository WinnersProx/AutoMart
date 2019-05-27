import UserModel from './user'
class CarsModel {
    errors(){
        return []
    }
    getCars(){
        return [
            {
                id : Integer ,
                user : Object,
                created_on : DateTime ,
                manufacturer : String ,
                model : String ,
                price : Float ,
                state : String ,
                status : String ,
            }
        ]
    }
    createCar(newCar){
        newCar.id = parseInt(this.getUsers().length)
        newCar.created_on = new Date()

        // get first the author of the car
        newCar.user = UserModel.findById(process.env.UTOKEN.split('.')[0])

        this.getCars().push(newCar)
        return newCar
    }
    
    findById(carId){
        carId = parseInt(carId)
        return this.getCars().find((found) => {
            return found.id === carId
        })
    }

}
const carsModel = new CarsModel()
export default carsModel