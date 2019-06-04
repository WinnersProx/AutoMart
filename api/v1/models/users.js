// should have an id, email, firstname, last_name, password, address and is_admin properties
global.user_error = "Error occured"
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
let authenticated = [
    { UTOKEN : ""}
]

class UserModel {
    // list all the users
    authenticate(token){
        authenticated[0].UTOKEN = token
    }
    getAuth(){
        return authenticated[0].UTOKEN
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
            newUser.id = parseInt(this.getUsers().length)
            newUser.is_admin = false
            userStore = [...userStore, newUser]
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
    get getAuthUser(){
        return this.findById(this.getAuth().split('.')[0])
    }

}
const userModel = new UserModel()
export default userModel