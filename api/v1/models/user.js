// should have an id, email, firstname, last_name, password, address and is_admin properties
global.user_error = "user could not be saved"
let userStore = [
    {
        id : 0 ,
        email : 'bihames4vainqueur@gmail.com' ,
        first_name : 'Bihame' ,
        last_name : 'Vainqueur' ,
        password : 'secret' ,
        address : 'Kigali Kabeza' ,
        is_admin : true 
    },
    {
        id : 1 ,
        email : 'johndoe@gmail.com' ,
        first_name : 'John' ,
        last_name : 'Doe' ,
        password : 'secret' ,
        address : 'Annonymous City' ,
        is_admin : true 
    }
];
class UserModel {
    
    // list all the users
    getUsers(){
        return userStore
    }
    // get user by id
    getUser(id){
        return userStore[parseInt(id)]
    }
    createUser(newUser){
        if(!this.userExists(newUser)){
            newUser.id = parseInt(this.getUsers().length)
            newUser.is_admin = false
            userStore.push(newUser)
            return this.getUser(newUser.id)
        }
        else{
            user_error = "email just taken"
            return false
        }
        
        
    }
    findUser(user){
        return userStore.find((found) => {
            return found.email === user.email && found.password === user.password
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
    
    isLoggedIn(user){
        const { email, token } = user
        if(email.trim() && token.trim()){
            const isSignedIn =  userStore.find((found) => {
                return user.email === found.email && user.password === found.password
            })
            return isSignedIn
        }
        else{
            user_error = "This user does not exist, please signup first"
            return false
        }
    }

}
const userModel = new UserModel()
export default userModel