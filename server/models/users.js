import bcrypt from 'bcrypt'
import dbModel from './db'

global.user_error = "Error occured"
let authenticated = {}
let authToken = null

class UserModel {
    setAuthToken(token){
        authToken = token
    }
    get authToken(){
        return authToken 
    }
    getUsers(){
        return db.users
    }
    createUser(newUser){
        newUser.id = parseInt(this.getUsers().length + 1)
        newUser.is_admin = false,
        newUser.password = bcrypt.hashSync(newUser.password, 10)
        dbModel.addItems(newUser, 'users')
        return dbModel.findbyField('id', 'users', newUser.id)
    }
    findUser(user){
        return db.users.find((found) => {
            return found.email === user.email && bcrypt.compareSync(user.password, found.password)
        })
    }
    userExists(user){
        return db.users.find((found) => {
            return found.email === user.email
        })
    }
    setAuthUser(auth){
        authenticated = auth
    }
    get getAuthUser(){
        return authenticated
    }
    
    resetPassword(email, datas){
        let user = dbModel.findbyField('email', 'users', email)
        const { new_password, confirm_password } = datas
        if(user){
            if((new_password && confirm_password) && (new_password === confirm_password) && this.validatePassword(new_password)){
                db[model][user.id - 1].password = datas.new_password
                return user
            }
            return false
        }
        return false
    }


}
const userModel = new UserModel()
export default userModel