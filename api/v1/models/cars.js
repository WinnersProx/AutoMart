import userModel from './users'
let carsStock = [
    {
        id : 0 ,
        owner : 0,
        created_on : new Date() ,
        manufacturer : "Toyota" ,
        model : "Mercedess Benz" ,
        price : 150000.00 ,
        state : "Used" ,
        status : "available" ,
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
        let owner = userModel.findById(process.env.UTOKEN.split('.')[0])
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
    updateCarStatus(carId){
        let target = this.findById(parseInt(carId))
        if(target &&  parseInt(userModel.getAuthUser().id) === parseInt(target.owner)){
            target.status = 'sold'
            return target
        }
        return false
    }


}
const carsModel = new CarsModel()
export default carsModel