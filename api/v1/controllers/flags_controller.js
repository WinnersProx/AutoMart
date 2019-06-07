import flagsModel from '../models/flags'
const flagsController = {

    newFlag : (req, res) => {
        let flag = flagsModel.addFlag(req.body, req.params.car_id)
        res.status(201).send({
            status : 201,
            data : {
                id : flag.id,
                car_id : flag.car_id,
                reason : flag.reason,
                description : flag.description
            }
        })
    }
    
}
export default flagsController