const CART = require('mongoose').model('Cart');
const DEVICE = require('mongoose').model('Device');
//const RECEIPT = require('mongoose').model('Receipt');
const USER = require('mongoose').model('User');
const cartRepository = require('../repositories/cartRepository');
const deviceRepository = require('../repositories/deviceRepository');
exports.addItemToCart = async (req, res) => {
    const {
        deviceId,
        condition,
        cartId
    } = req.body;
    console.log('carId from req ======>',cartId);
    console.log('reeeqqq from req ======>',req.body);
    //const quantity = Number.parseInt(req.body.quantity);
    try {
        let cart = await cartRepository.cart(cartId);
        let deviceDetails = await deviceRepository.deviceById(deviceId);
             if (!deviceDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Device not found!"
            })
        }
        //--If Cart Exists ----
        if (cart) {
            //---- Check if device exists in the cart  item.deviceId._id == deviceId----
            const indexFound = cart.items.findIndex(item => item.deviceId == deviceId);
            //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
            // if (indexFound !== -1 && quantity <= 0) {
            //     cart.items.splice(indexFound, 1);
            //     if (cart.items.length == 0) {
            //         cart.subTotal = 0;
            //     } else {
            //         cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            //     }
            // }
            //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
            if (indexFound !== -1) {
                console.log('already exist error');
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Product already exist"
                })
               var price;
               switch(condition){
                   case 'newcondition' : price =  deviceDetails.newcondition;
                   case 'goodcondition' : price =  deviceDetails.goodcondition;
                   case 'poorcondition' : price =  deviceDetails.poorcondition;
                   case 'faultycondition' : price =  deviceDetails.faultycondition;
               }
               console.log("price==>",price);
                cart.items[indexFound].price = price
                cart.subTotal = cart.items.map(item => item.price).reduce((acc, next) => acc + next);
            }
            //----Check if quantity is greater than 0 then add item to items array ----
            else if (indexFound == -1){
                console.log('where the add item ');
                var price;
               switch(condition){
                   case 'newcondition' : price =  deviceDetails.newcondition;
                   case 'goodcondition' : price =  deviceDetails.goodcondition;
                   case 'poorcondition' : price =  deviceDetails.poorcondition;
                   case 'faultycondition' : price =  deviceDetails.faultycondition;
               }
               console.log("price==>",price);
                cart.items.push({
                    deviceId: deviceId,
                    quantity: 1,
                    price: price,
                })
                cart.subTotal = cart.items.map(item => item.price).reduce((acc, next) => acc + next);
            }
            //----If quantity of price is 0 throw the error -------
            else {
                console.log('0 impossible error');
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            })
        }
        //------------ Cart not found ------------
        else {
            console.log('cart not found  error');
            res.status(404).json({
                type: "Invalid",
                msg: "404 cart not found",
                err: err
            })
        }
    } catch (err) {
        console.log('somth is wronfg    error');
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}


exports.getCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart(req.params.cart_id)
        
        if (!cart) {
            return res.status(400).json({
                type: "Invalid",
                msg: "Cart not Found",
            })
        }
        res.status(200).json({
            status: true,
            data: cart
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}


exports.emptyCart = async (req, res) => {
    try {
        console.log("cart  ID in delete ",req.params.cart_id);
        let cart = await cartRepository.cart(req.params.cart_id);
        console.log("cart in delete ",cart);
        cart.items = [];
        cart.subTotal = 0
        let data = await cart.save();
        console.log("data",data);
        res.status(200).json({
            type: "success",
            mgs: "Cart has been emptied",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}

exports.removeItem = async (req, res) => {


    try {
        let cart = await cartRepository.cart(req.params.cart_id);
        if(cart){
            const indexOfItem = cart.items.findIndex(item => item.deviceId._id == req.params.device_id);
            cart.items.splice(indexOfItem, 1);
            console.log("after sclice",cart)
            if (cart.items.length == 0) {
                cart.subTotal = 0;
             } else {
               cart.subTotal =  cart.items.map(item => item.price).reduce((acc, next) => acc + next);
             }
             
             let data = await cart.save();
    
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            }) 
        }
        else {
            res.status(404).json({
                type: "invalid",
                msg: "404 cart not found",
                err: err
            })
        }
    } catch(err){}
}