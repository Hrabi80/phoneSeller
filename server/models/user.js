var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    firstname:{
        type:String,
        default: ''
    },
    lastname:{
        type:String,
        default:''
    },
    facebookId: String,
    firsttimefacebook: {
      type:String,
      default: true,  
    },
    admin:{
        type:Boolean,
        default:false,
    },
    email:{
        type:String,
    },
    phone:{
        type: String,
    },
    street:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type: String,
    },
    zip:{
        type:String,
    },
    paypal:{
        type: String,
    },
    zelle:{
        type:String,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart' 
    },
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',UserSchema);