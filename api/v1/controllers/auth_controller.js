import UserModel from '../models/user'

const authController = {

    signup : (req, res) => {
        let user = UserModel.createUser(req.body)
        // console.log(newUser)
        if(user){
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
                message : "Unable to save user!"
            })
        }
        
    },
    signin : (req, res) => {

    }
}
export default authController