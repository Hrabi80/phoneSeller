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
            //---- Check if device exists in the cart ----
            const indexFound = cart.items.findIndex(item => item.deviceId == deviceId);
            //----------Check if product already exist-------
            if (indexFound !== -1) {
                console.log('already exist error');
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Product already exist"
                })
            }
            //----Add Item ----
            else if (indexFound == -1){
                console.log('-----------where the add item ---------------');
                var productName = deviceDetails.productId.name;
                var productPhoto = deviceDetails.productId.photo; 
                var price;
                var productCondition;
               switch(condition){
                   case 'newcondition' : {price =  deviceDetails.newcondition ; productCondition = "New Condition";break;}
                   case 'goodcondition' : {price =  deviceDetails.goodcondition ; productCondition= "Good Condition";break;}
                   case 'poorcondition' : {price =  deviceDetails.poorcondition ; productCondition= "Poor Condition";break;}
                   case 'faultycondition' :{price =  deviceDetails.faultycondition ; productCondition= "Faulty Condition";break;}
               }
               const payload = {
                deviceId: deviceId,
                quantity: 1,
                price: price,
                name : productName,
                photo : productPhoto,
                condition: productCondition,
                characteristics  : deviceDetails.characteristics
               }
                cart.items.push(payload)
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
           // console.log("cart items ===>",cart.items);
            const indexOfItem = cart.items.findIndex(item => item.deviceId._id == req.params.device_id);
            cart.items.splice(indexOfItem, 1);
            
            if (cart.items.length == 0) {
                cart.subTotal = 0;
             } else {
               cart.subTotal =  cart.items.map(item => item.price).reduce((acc, next) => acc + next);
             }
            
             let data =  cart.save();
         //    console.log("after let data await save ",data);
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