import ordersModel from '../models/orders'
const ordersController = {

    newOrder : (req, res) => {
        let order = ordersModel.createOrder(req.body)
        if(order){
            res.status(201)
            .send({
                status : 201,
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
        
    },
    updatePrice : (req, res) => {
        const update = ordersModel.newPrice(parseInt(req.params.order_id), req.body.amount)
        if(update)
            res.status(200).send({ status : 200, data : update})
        else
            res.status(400).send({ status : 400, error : "Error occured, try again later!"})
    }
    
}
export default ordersController