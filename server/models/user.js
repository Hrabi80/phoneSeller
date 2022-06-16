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
    admin:{
        type:Boolean,
        default:false,
    },
    email:{
        type:String,
        
    }
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',UserSchema);