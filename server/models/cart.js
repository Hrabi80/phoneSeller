const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device",
    },
    quantity: {
        type: Number,
        default: 1
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
