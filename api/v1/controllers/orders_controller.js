import ordersModel from '../models/orders'
const ordersController = {

    newOrder : (req, res) => {
        let order = ordersModel.createOrder(req.body)
        if(order){
            res.status(200)
            .send({
                status : 200,
                data : order
            })
        }
        else{
            res.status(400)
            .send({
                status : 400 ,
                message : "Could not order, try again later!"
            })
        }
        
    }
    
}
export default ordersController