import userModel from '../models/users';
import crypto from 'crypto'
const authController = {

    signup : (req, res) => {
        let user = userModel.createUser(req.body)
        if(user){
            authController.authenticate(user)
            res.status(200)
            .send({
                status : 200,
                data : user
            })
        }
        else{
            res.status(401)
            .send({
                status : 401 ,
                message : user_error
            })
        }
        
    },
    signin : (req, res) => {
        let user = userModel.findUser(req.body)
        if(user){
            authController.authenticate(user)
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
        userModel.authenticate(null)
        res.status(200).send({
            message : "User logged out successfully",
            status : 200
        })
    },
    authenticate : (user) => {
        let token = ((user.id) + '.' + crypto.randomBytes(8).toString('hex'));
        process.env.UTOKEN = token 
        user.token = token;
        userModel.authenticate(user.token)
        return user;
    }
}
export default authController