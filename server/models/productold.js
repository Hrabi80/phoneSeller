const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Define Schema
let productoldSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required:true
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
  category:{
    type: String,
  },
  condition:{
    type: String,
    price: {
      type:Currency,
      required:true,
      min:0,
    }
  },
  price:{
    type:Currency,
    required:true,
    min:0,
},

}, {
    timestamps : true
  })
var Products = mongoose.model('Productold',productoldSchema);

module.exports = Products;
