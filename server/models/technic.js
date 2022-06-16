const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let technicSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required:true
  },
  description: {
    type: String,
  },
  cat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' 
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
var Technics = mongoose.model('Technic',technicSchema);

module.exports = Technics;
