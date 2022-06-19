const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Define Schema
let deviceSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  characteristics: {
    type: String,
    required:true
  },
  islocked:{
      type:Boolean,
      default:true
  },
  newcondittion:{
    type:Number,
    required:true,
    min:0,
  },
  goodcondittion:{
    type:Number,
    required:true,
    min:0,
  },
  poorcondittion:{
    type:Number,
    required:true,
    min:0,
  },
  faultycondittion:{
    type:Number,
    required:true,
    min:0,
  },

}, {
    timestamps : true
  })
var Devices = mongoose.model('Device',deviceSchema);

module.exports = Devices;
