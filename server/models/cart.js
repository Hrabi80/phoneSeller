const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User'},
    items:[{
        item: { type: Schema.Types.ObjectId,ref: "Device" },
        quantity: Number,
        itemsPrice: Number,
    }],
    totalQty: Number,
    totalPrice: Number,
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
