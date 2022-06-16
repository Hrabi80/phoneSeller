const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gallerySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
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
  var Galleries = mongoose.model('Gallery',gallerySchema);
  
  module.exports = Galleries;
  