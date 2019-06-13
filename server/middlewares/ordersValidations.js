import ordersModel from '../models/orders'
import carsModel from '../models/cars';
import dbModel from '../models/db'
import userModel from '../models/users'
const ordersValidations = {
    validateOrder : (req, res, next) => {
        
        const { car_id, amount, status = "pending" } = req.body
        let errors = []
        // car's identifier validation
        if(car_id && car_id.trim()){
            // check if really the car exist in the system
            if(!dbModel.findbyField('id', 'cars', parseInt(car_id)))
                errors.push("Sorry, the car you specified does not exist here...")
        }
        else{
            errors.push("The car identifier should be specified")
        }
        // the car's amount validation
        if(!amount || !amount.trim()){
            errors.push("The amount that you propose")
        }
        
        if(errors.length)
            res.status(400).send({ status : 400, errors : errors})
        next()
        errors = []
        
    },
    checkOrder : (req, res, next) => {
        const orderId = req.params.order_id
        const order = dbModel.findbyField('id', 'orders', parseInt(orderId))
        let errors = []
        if(!order){
            errors.push("The given order does not exist")
        }
        else{
            order.status !== 'pending' ? errors.push("Sorry at this stage the order cannot be updated") 
            : errors
            parseInt(order.buyer) !== userModel.getAuthUser.id
            ? errors.push("Sorry, You cannot update the order which is not yours") 
            : errors
        }
            
        if(errors.length)
            res.status(400).send({ status : 400, errors : errors})
        next()
        errors = []
    }
    
}
export default ordersValidations