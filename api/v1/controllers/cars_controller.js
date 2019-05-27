import CarsModel from '../models/cars'
import Validations from '../middlewares/authValidation'
import userModel from '../models/user';
const authController = {

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
                message : "Unable to save this post"
            })
        }
        
    },
    signin : (req, res) => {
        let user = UserModel.findUser(req.body)
        
        if(user){
            Validations.authenticate(user)
            res.status(200)
            .send({
                status : 200 ,
                data : user
            })
        }
        else{
            res.status(401)
            .send({
                status : 401 ,
                message : "Incorrect credentials!"
            })
        }
    },
    signout : (req, res) => {
        process.env.UTOKEN = null
        res.status(200).send({
            message : "User logged out successfully",
            status : 200
        })
    }
}
export default authController