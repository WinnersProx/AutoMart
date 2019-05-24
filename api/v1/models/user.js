// should have an id, email, firstname, last_name, password, address and is_admin properties
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
        newUser.id = parseInt(this.getUsers().length)
        newUser.is_admin = false
        userStore.push(newUser)
        return this.getUser(newUser.id)
    }

}
const userModel = new UserModel()
export default userModel