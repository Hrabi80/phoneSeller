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
    price: {
        type: Number,
        required: true
    },
  

}, {
    timestamps: true
})


const orderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
      },
    items: [ItemSchema],
    status: {
        type:String,
        required: true,
        default : 'awaiting',
        enum: {
            values: ['awaiting', 'rejected','received','checked','paid'],
            message: '{VALUE} is not supported'
          }
    },
    paymentMethod:{
        type:String,
        required: true
    },
    paymentAdress:{
        type:String,
        required: true
    },
    meeting:{
        type:String,
        required: true
    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    phone:{
        type:String,
        required: true
    },
    street:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    username:{
        type:String,
        required: true
    },
    zip:{
        type:String,
    },
    subTotal:{
        type:String,
    },
}, {
    timestamps: true
})


var Order = mongoose.model('Order', orderSchema);
module.exports = Order;
