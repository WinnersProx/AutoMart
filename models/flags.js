import UserModel from './users'
let flagsList = [
    {
        id : 0 ,
        car_id : 0 ,
        author : 0,
        created_on : new Date() ,
        reason : 'Pricing',
        description : 'Pricing is really a very difficult problem here!'
    }
]

class FlagsModel {
    
    get getFlags(){
        return flagsList
    }
    addFlag(newFlag, carId){
        const user = UserModel.findById(process.env.UTOKEN.split('.')[0]) // the id of the current user
        newFlag.id = parseInt(this.getFlags.length)
        newFlag.car_id = parseInt(carId)
        newFlag.author = user.id,
        newFlag.created_on = new Date()
        flagsList = [...flagsList, newFlag]
        return newFlag
    }
    
    findById(flagId){
        flagId = parseInt(flagId)
        return this.getFlags.find((found) => {
            return found.id === flagId
        })
    }

    

}
const flagsModel = new FlagsModel()
export default flagsModel