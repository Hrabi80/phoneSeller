const mongoose = require('mongoose');

const ORDER = require('mongoose').model('Order');
const CART = require('mongoose').model('Cart');
const USER = require('mongoose').model('User');

const orderRepository = require('../repositories/orderRepository');
const cartRepository = require('../repositories/cartRepository');

const fedexService = require('../services/fedex');
const pdfService = require('../services/pdf-service');
exports.createOrder = async (req, res) => {
    try {
        let id = new mongoose.Types.ObjectId();
        let orderPayload= Object.assign({_id:id},req.body);
        //generate PDF and send mail
        var myPDF = await pdfService.buildPDF(orderPayload);
        //createOrder
        let order = await orderRepository.createOrder(orderPayload);
        //FEDEX API const fedexResponse = fedexService.createShippment();
       //Empty cart
        try {
            let cart = await cartRepository.cart(orderPayload.cart_id);
            cart.items = [];
            cart.subTotal = 0
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Cart has been emptied",
                data: data
            })
            }catch (err) {
                console.log(err)
                res.status(400).json({
                    type: "Invalid",
                    msg: "Something went wrong",
                    err: err
                })
            }

        setTimeout(() => {
            res.status(200).json({
                status: true,
                data: order,
             //   fedex : fedexResponse
            })
        }, 4000);
        
       
    
    } catch (err) {
        console.log('somthing is wrong');
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}
exports.getOrders = async (req, res) => {
    ORDER.find({})
    .then((orders)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(orders);
    },(err)=>next(err))
    .catch((err)=>next(err));
}
exports.getOrderById = async (req, res) => {
    ORDER.findById(req.params.order_id)
    .then((orders)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(orders);
    },(err)=>next(err))
    .catch((err)=>next(err));
}
exports.getOrderByUser = async (req, res) => {
    ORDER.find({})
    .where('owner').equals(req.params.user_id)
    .then((order)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(order);
    },(err)=>next(err))
    .catch((err)=>next(err));
}
exports.UpdateOrder = async (req, res,next) => {
    ORDER.findByIdAndUpdate({ _id: req.params.order_id }, { $set: req.body },{new:true})
        .then((resp)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        },(err)=>next(err))
       .catch((err)=>next(err));
}
exports.deleteOrder = async (req, res) => {}



