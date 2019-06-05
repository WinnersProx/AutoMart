import userModel from '../models/users'
import randomBytes from 'random-bytes'
import nodeMailer from 'nodemailer'
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
        let token = ((user.id) + '.' + randomBytes.sync(8).toString('hex').toUpperCase())
        process.env.UTOKEN = token 
        user.token = token;
        userModel.authenticate(user.token)
        return user;
    },
    initializeReset : (req, res) => {
        const { email } = req.body
        if(email){
            let user = userModel.findByEmail(email)
            if(user){
                let token = randomBytes.sync(16).toString('hex').toUpperCase()
                process.env.RESET_TOKEN = token,
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