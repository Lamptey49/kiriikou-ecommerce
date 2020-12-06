const { Order, CartItem } = require('../models/orderModel')
const errorHandler = require('./../helpers/dbErrorHandler')

const createOrder = async(req, res)=>{
    try{
        req.body.order.user = req.profile
        const order = new Order(req.body.order)
        let result = await order.save()
        res.status(200).json(result)
    }
    catch(errror){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
}

const listByShop = async(req, res)=>{
    try {
        let orders = await Order.find({'products.busines':req.business._id})
        .populate({path: 'products.product', select:'_id name price'})
        .sort('-created')
        .exec()
        res.json(orders)
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
}
const update = async(req, res)=>{
    try {
        let order = await Order.update({'products._id':req.body.cartItemId}, {'$set':{
            'products.$.status':req.body.status
        }})
        res.json(order)
    } catch (error) {
        return res.status(400).json({
            error:errorHandler.getErrorMessage(error)
        })
    }
}
const getStatusValues = (req, res)=>{
    res.json(CartItem.schema.path('status').enumValues)
}
const orderById = async(req, res, next, id)=>{
    try {
        let order = await (await Order.findById(id)).populate('products.product', 'productname price').populate('products.business', 'name').exec()
        if(!order)
            return res.status(400).json({
                error: 'Order not found'
            })
        res.order = order
        next()
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
}

const listByUser = async(req, res)=>{
    try {
        let orders = await Order.find({'user':req.profile._id})
        .sort('-created')
        .exec()
        res.json(orders)
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
}

const read = (req, res)=>{
    return res.json(req.order)
}
module.exports = {
    createOrder,
    listByShop,
    update, 
    getStatusValues, 
    orderById,
    listByUser,
    read
}