const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        // min:10000000,
        // max:99999999
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