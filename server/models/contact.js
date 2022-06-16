const mongoose = require('mongoose');
//const { text } = require('express');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    mail:{
        type:String,
        required:true,
    },
    tel:{
        type:Number,
        required:true,
        min:10000000,
        max:99999999
    },
    message:{
        type:String,
        required:true
    }
}
,{
    timestamps : true
});


var Contacts = mongoose.model('Contact',contactSchema);

module.exports = Contacts;