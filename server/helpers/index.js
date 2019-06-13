import jwt from 'jsonwebtoken'
import randomBytes from 'random-bytes'
import dbModel from '../models/db'
import userModel from '../models/users';
import jwtDecode from 'jwt-decode'
const mainHelper = {
	// for user authentication
	authenticate : (user) => {
		user.token = jwt.sign({
		        email : user.email,
		        id    : user.id
	        }, 
	        process.env.SECRET_KEY,
	        {
            expiresIn : "1h"
        })
        userModel.setAuthToken(user.token)
    	return user
    },
    generateRandomToken : () => {
    	const random = randomBytes.sync(16).toString('hex').toUpperCase()
    	return random
	},
	tokenSignIn : token => {
		token = token.split(' ')
		if(token[1] === userModel.authToken){
			let user = dbModel.findbyField('id', 'users', jwtDecode(token[1]).id)
			if(user) 
				return token[1]
			return false
		}
	}
}
export default mainHelper