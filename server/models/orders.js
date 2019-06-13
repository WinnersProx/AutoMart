import UserModel from './users'
import CarsModel from './cars'
import dbModel from './db'
class OrdersModel {
    
    getOrders(){
        return db.orders
    }
    createOrder(newOrder){
        let buyer = UserModel.getAuthUser // the id of the current user
        newOrder.id = parseInt(this.getOrders().length)
        newOrder.buyer = buyer.id,
        newOrder.car_id = parseInt(newOrder.car_id)
        newOrder.created_on = new Date()
        dbModel.addItems(newOrder, 'orders')
        newOrder.price_offered = newOrder.amount
        newOrder.amount = dbModel.findbyField('id', 'cars', parseInt(newOrder.car_id)).price
        return newOrder
    }

    newPrice(priceId, price){
        const order = dbModel.findbyField('id', 'orders', parseInt(priceId))
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