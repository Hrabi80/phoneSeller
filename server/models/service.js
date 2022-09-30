const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
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
  }, {
      timestamps : true
    })



const serviceSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    products:[productSchema],

}
,{
    timestamps : true
});


var Services = mongoose.model('Service',serviceSchema);

module.exports = Services;