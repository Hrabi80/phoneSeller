const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    description:{
        type:String,
       // required:true,
    },
    photo: {
        type:String,
      },
    upPrice:{
      type:Number,
      required:true,
      min:0,
    },
    category:{
        type:String,
        required: true,
        enum: {
            values: ['iPhone', 'iPad', 'iWatch','Mac'],
            message: '{VALUE} is not supported'
          }
    },
    devices:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device' 
        }
    ],
}
,{
    timestamps : true
});
/*
const deviceSchema = new Schema({
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
    upPrice:{
      type: Currency,
      required:true,
      min:0,
    }
  }, {
      timestamps : true
    })

*/




var Products = mongoose.model('Product',productSchema);

module.exports = Products;