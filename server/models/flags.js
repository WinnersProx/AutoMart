import UserModel from './users'
import dbModel from './db'
class FlagsModel {
    
    get getFlags(){
        return db.flags
    }
    addFlag(newFlag, carId){
        const user = UserModel.getAuthUser 
        newFlag.id = parseInt(this.getFlags.length + 1)
        newFlag.car_id = parseInt(carId)
        newFlag.author = user.id
        newFlag.created_on = new Date()
        dbModel.addItems(newFlag, 'flags')
        return newFlag
    }

}
const flagsModel = new FlagsModel()
export default flagsModel