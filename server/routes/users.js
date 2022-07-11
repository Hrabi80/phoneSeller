var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
var passport = require('passport');
var cors = require('./cors');
var User = require('../models/user');

router.use(bodyParser.json());
router.post('/signup',cors.corsWithOptions, (req, res, next) => {
  User.register(new User({username: req.body.username}), //refister() by passport mongoose plugin
    req.body.password,(err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if(req.body.admin)
        user.admin = req.body.admin;
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
      
    }
  });
});
//use passpoert.authentificate as a middlware // only req and res
router.post('/login',cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
  
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,token: token,status: 'You are successfully logged in!'});
});

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
});

router.route('/getUserById/:userId')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    User.findById(req.params.userId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.route('/api/updateUser/:userId')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.post(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /api/category/id');
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    User.findByIdAndUpdate(req.params.userId,{$set: req.body},{new:true})
    .then((updatedUser)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(updatedUser);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Categories.findByIdAndRemove(req.params.id_cat)
    .then((cat)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(cat);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = router;
