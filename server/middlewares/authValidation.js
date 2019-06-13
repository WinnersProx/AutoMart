import jwtDecode from 'jwt-decode'
import dbModel from '../models/db'
import userModel from '../models/users';

let errors = []
const AuthValidations = {
    validateUser : (req, res, next) => {
        
        const { email, first_name, last_name, password, password_confirm, address } = req.body
        // email validation
        if(!email && !email.trim()){
            errors.push("The email cannot be empty")
        }
        // firstname validation
        if(!first_name && !first_name.trim()){
            errors.push("The first name cannot be empty")
        }
        
        // last name validation
        if(!last_name && !last_name.trim()){
            errors.push("The last name cannot be empty")
        }

        // address validations
        if(!address.trim()){
            errors.push('The address is required')
        }
        
        if(errors.length)
            res.status(400).send({ status : 400, errors : errors})
        next()
        errors = []
        
    },
    validateSignin : (req, res, next) => {
        const { email, password } = req.body
        // email validation
        if(req.body.length){
            if(!email || !email.trim()){
                errors.push("The email should not be empty")
            }
            // password validation
            if(!password || !password.trim()){
                errors.push("The password should not be empty")
            }
        }
        
        if(errors.length)
            res.status(400).send({ status : 400, errors : errors})
        next()
        errors = []
    },
    isAuthenticated : (req, res, next) => {
        let auth = req.headers.authorization ? req.headers.authorization.split(' ') : null
        if(auth && (auth[0] === 'Bearer') && (auth.length === 2) && (auth[1] === userModel.authToken)){
            let user = dbModel.findbyField('id', 'users', jwtDecode(auth[1]).id)
            if(!user) return res.status(403).send({ status : 403, message : "You must login to access this location"})
            userModel.setAuthUser(user)
        }
        else{
            return res.status(403).send({ status : 403, message : "You are not allowed to access this location login first"})
        }
        next()
    },
    validatePassword : (req, res, next) => {
        // passwords validation
        const { password, password_confirm } = req.body

        if(password && password.trim()){
            if(password != password_confirm){
                return res.status(400).send({ status : 400, error : 'password and password confirm should match'})
            }
            console.log(password.length >= 6 && password.length <= 30)
            if(!(password.length >= 6 && password.length <= 30))
                return res.status(400).send({ status : 400, error : 'passwords are to be 6 to 30 characters long'})
            
        }
        else{
           return res.status(400).send({ status : 400, error : 'password and password confirm are required'}) 
        }
        
        
        next()
    },
    userExists : (req, res, next) => {
        if(userModel.userExists(req.body)){
            return res.status(403).send({ status : 403, error : "Sorry this email is already taken"})
        }
        next()

    },
    isAdmin : (req, res, next) => {
        let authUser = jwtDecode(req.headers.authorization.split(' ')[1])
        let user = dbModel.findbyField('id', 'users', authUser.id)
        if(!user.is_admin){
            res.status(403).send({ status : 403, error : 'You must be an admin to access this location'})
        }
        next()
    }
    
}
export default AuthValidations