import userModel from '../models/users'
import dbModel from '../models/db'
import mainHelper from '../helpers'
const authController = {

    signup : (req, res) => {
        let user = userModel.createUser(req.body)
        if(user){
            user = mainHelper.authenticate(user)
            res.status(201)
            .send({
                status : 201,
                data : user.token
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
            mainHelper.authenticate(user)
            res.status(200)
            .send({
                status : 200 ,
                data : {token : user.token}
            })
        }
        else{
            
            if(req.headers.authorization){
                let token = mainHelper.tokenSignIn(req.headers.authorization)
                if(token){
                    return res.status(200).send({ status: 200, data : {token : token}})
                }
                return res.status(401).send({ status : 401, error : 'Your token is wrong'})
            }
            res.status(401)
            .send({
                status : 401 ,
                message : "Incorrect credentials!"
            })
        }
    },
    signout : (req, res) => {
        res.status(200).send({
            message : "User logged out successfully",
            status : 200
        })
    },
    
    initializeReset : (req, res) => {
        const { email } = req.body
        if(email){
            let user = dbModel.findbyField('email', 'users', email)
            if(user){
                let token = mainHelper.generateRandomToken()
                process.env.RESET_TOKEN = token
                process.env.email = email
                res.status(200).send({ status : 200, data : {
                    url : '/reset-password/' + token,
                    email : user.email
                }}) 
            }
            else{
                res.status(400).send({ status : 400, error : "The requested user does not exist!"}) 
            }
        }
    },
    resetPassword : (req, res) => {
        if(req.params.reset_token === process.env.RESET_TOKEN){
            let user = userModel.resetPassword(process.env.email, req.body)
            if(user)
                res.status(200).send({ status : 200, data : user})
            else
                res.status(400).send({ status : 400, error : 'Unable to change the user password please try again later!'})
        }
        else{
            res.status(403).send({ status : 403, error : 'Sorry, This token is corrupted or may have been expired'})
        }
    }
}
export default authController