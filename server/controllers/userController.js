const mongoose = require('mongoose');
const USER = mongoose.model('User');
var authenticate = require('../authenticate');
exports.getUsers = async (req, res) => {
    USER.find({})
    .then((users)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(users);
    },(err)=>next(err))
    .catch((err)=>next(err));
}

exports.facebookLogin = async(req,res,next)=>{
    //check if request contain user
    if (req.user) {
    //check if user already exists
    USER.find({})
    .where('facebookId').equals(req.user.facebookId)
    .then((fbuser)=>{
        if(fbuser){
            //check if user has a card
            var token = authenticate.getToken({_id: req.user._id});
            console.log("token",token);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, token: token, status: 'You are successfully logged in!'});
        }else{
            console.log("user does not Exists !!!!!")
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
  }
  else{
    res.json({success: false, status: 'req user not found !'});
  }
}
