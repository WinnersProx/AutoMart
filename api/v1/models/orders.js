import UserModel from './users'
import CarsModel from './cars'
let ordersStock = [
    {
        id : 0 ,
        buyer : 0,
        car_id : 0 ,
        amount : 150000.00 ,
        status : "pending"
    }
]

class OrdersModel {
    
    getOrders(){
        return ordersStock
    }
    createOrder(newOrder){
        let buyer = UserModel.findById(process.env.UTOKEN.split('.')[0]) // the id of the current user
        newOrder.id = parseInt(this.getOrders().length)
        newOrder.buyer = buyer.id
        newOrder.created_on = new Date()
        ordersStock = [...ordersStock, newOrder]
        newOrder.price_offered = newOrder.amount
        newOrder.amount = CarsModel.findById(newOrder.car_id).price
        return newOrder
    }
    
    findById(orderId){
        orderId = parseInt(orderId)
        return this.getOrders().find((found) => {
            return found.id === orderId
        })
    }

    newPrice(priceId, price){
        const order = this.findById(priceId)
        if(order){
            const old = order.amount
            order.old_price_offered = old
            order.new_price_offered = price
            return order
        }
    }

}
const ordersModel = new OrdersModel()
export default ordersModel