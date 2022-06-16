const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const technicSchema = new Schema({
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
    t1: {
      type: String,
    },
    t2: {
      type: String,
    },
    t3: {
      type: String,
    },
    t4: {
      type: String,
    },
    t5: {
      type: String,
    },
    t6: {
      type: String,
    },
  }, {
      timestamps : true
    })



const categorySchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    technics:[technicSchema],

}
,{
    timestamps : true
});


var Categories = mongoose.model('Category',categorySchema);

module.exports = Categories;