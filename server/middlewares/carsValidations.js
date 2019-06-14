import carsModel from '../models/cars'
import dbModel from '../models/db'
const carsValidations = {
    validateCar : (req, res, next) => {
        
        const { manufacturer, model, price, state, status, body_type } = req.body
        let errors = []
        // manufacturer validation
        if(!manufacturer){
            errors.push("The manufacturer cannot be empty")
        }
        // the car's model validation
        if(!model){
            errors.push("The model name cannot be empty")
        }
        
        // car's price validation
        if(!price){
            errors.push("The price should not left empty")
        }

        // car state validation
        if(!state){
            errors.push('The car state is required')
        }

        // car's status validations
        if(!status){
            errors.push('The car\'s status is required')
        }
        
        // the car's body type validation
        if(!body_type){
            errors.push('The car\'s body type is required')
        }

        if(errors.length)
            res.status(400).send({ status : 400, errors : errors})
        next()
        errors = []
        
    },
    exists : (req, res, next) => {
        let car = dbModel.findbyField('id','cars',parseInt(req.params.car_id))
        if(!car){
            res.status(404).send({ status : 404, error : "Please the target car ad could not be found" })
        }
        next()
    }
    
}
export default carsValidations