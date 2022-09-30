const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
    deviceId: {
    type: mongoose.Schema.Types.ObjectId,
        ref: "Device",
    },
    name:{
        type:String,
        required : true
    },
    photo :{
        type:String,
    },
    condition:{
        type:String,
        //required : true
    },
    quantity: {
        type: Number,
        default: 1
    },
    characteristics : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
  

}, {
    timestamps: true
})


const cartSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
      },
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})


var Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
