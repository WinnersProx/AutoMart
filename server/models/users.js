// should have an id, email, firstname, last_name, password, address and is_admin properties
import bcrypt from 'bcrypt'
import passport from 'passport'
global.user_error = "Error occured"
let userStore = [
    {
        id : 0 ,
        email : 'bihames4vainqueur@gmail.com' ,
        first_name : 'Bihame' ,
        last_name : 'Vainqueur' ,
        password : '$2b$10$KBI3hZ8aKqXiQPkQk0XPOeuaXY7r6QIO.EdJSylkdxgpFRFOuA4vq' ,
        address : 'Kigali Kabeza' ,
        is_admin : true 
    },
    {
        id : 1 ,
        email : 'johndoe@gmail.com' ,
        first_name : 'John' ,
        last_name : 'Doe' ,
        password : '$2b$10$KBI3hZ8aKqXiQPkQk0XPOeuaXY7r6QIO.EdJSylkdxgpFRFOuA4vq' ,
        address : 'Annonymous City' ,
        is_admin : true 
    }
];

class UserModel {

    getAuth(){
        return passport.authenticate('jwt', (err, user, info) => {
            return !user ? false : user
        })
    }
    getUsers(){
        return userStore
    }
    // get user by id
    getUser(id){
        return this.getUsers()[parseInt(id)]
    }
    createUser(newUser){
        if(!this.userExists(newUser)){
            if(this.validatePassword(newUser.password)){
                newUser.id = parseInt(this.getUsers().length)
                newUser.is_admin = false,
                newUser.password = bcrypt.hashSync(newUser.password, 10)
                userStore = [...userStore, newUser]
                return this.getUser(newUser.id)
            }
            return false
        }
        else{
            user_error = "email just taken"
            return false
        }
    }
    findUser(user){
        return userStore.find((found) => {
            return found.email === user.email && bcrypt.compareSync(user.password, found.password)
        })
    }
    findById(userId){
        userId = parseInt(userId)
        return userStore.find((found) => {
            return found.id === userId
        })
    }
    userExists(user){
        return userStore.find((found) => {
            return found.email === user.email
        })
    }
    get getAuthUser(){
        return passport.authenticate('jwt', (err, user, info) => {
            return !user ? false : user
        })
    }

    findByEmail(email){
        return userStore.find((found) => {
            return found.email === email
        })
    }
    validatePassword(password){
        if(password.length >= 6 && password.length <= 30)
            return true
        return false
    }
    resetPassword(email, datas){
        let user = this.findByEmail(email)
        const { new_password, confirm_password } = datas
        if(user){
            if((new_password && confirm_password) && (new_password === confirm_password) && this.validatePassword(new_password)){
                userStore[user.id].password = datas.new_password
                return user
            }
            return false
        }
        return false
    }

}
const userModel = new UserModel()
export default userModel