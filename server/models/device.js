const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  characteristics: {
    type: String,
    required:true
  },
  islocked:{
      type:Boolean,
      default:true
  },
  newcondition:{
    type:Number,
    required:true,
    min:0,
  },
  goodcondition:{
    type:Number,
    required:true,
    min:0,
  },
  poorcondition:{
    type:Number,
    required:true,
    min:0,
  },
  faultycondition:{
    type:Number,
    required:true,
    min:0,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' 
  },

}, {
    timestamps : true
  })
var Devices = mongoose.model('Device',deviceSchema);

module.exports = Devices;
