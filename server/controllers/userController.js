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
        console.log('reqest facebook user ===>', req.user);
    //check if user already exists
    USER.find({})
    .where('facebookId').equals(req.user.facebookId)
    .then((fbuser)=>{
        if(fbuser.firsttimefacebook == true){
            var cart = new Cart({
                _id: new mongoose.Types.ObjectId(),
              });
              Cart.create(cart)
                .then((mycart)=>{
                    console.log('a new cart has been recorded',mycart,"iddd",cart._id);
                    res.status = 200;
                    res.setHeader('Content-Type','application/json');
                    User.findByIdAndUpdate(req.params.userId,{$set: {'firsttimefacebook': false , 'cart':cart._id}},{new:true})
                    .then((updatedUser)=>{
                        res.status.code=200;
                        res.setHeader('Content-Type','application/json');
                        res.json(updatedUser);
                    },(err)=>next(err))
                    .catch((err)=>next(err));
                });
                
            var token = authenticate.getToken({_id: req.user._id});
            console.log("token",token);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, token: token, status: 'You are successfully logged in!'});
        }else{
            var token = authenticate.getToken({_id: req.user._id});
            console.log("token",token);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, token: token, status: 'You are successfully logged in!'});
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
  }
  else{
    res.json({success: false, status: 'req user not found !'});
  }
}
