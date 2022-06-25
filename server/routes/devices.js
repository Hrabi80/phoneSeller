const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
const Device = require('../models/device');
const Product = require('../models/product');

//const Services = require('../models/service');


const deviceRouter = express.Router();
deviceRouter.use(bodyParser.json());


deviceRouter.route('/api/device/:prod_id')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.post( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin ,(req, res, next) => {
    Product.findById(req.params.prod_id)
    .then((prod)=>{
      if(prod !=null){
        console.log("see body here ===>", req.body.characteristics);
        var device = new Device({
          _id: new mongoose.Types.ObjectId(),
          characteristics: req.body.characteristics,
          islocked : req.body.islocked,
          newcondittion : req.body.newcondittion,
          goodcondittion: req.body.goodcondittion,
          poorcondittion: req.body.poorcondittion,
          faultycondittion: req.body.faultycondittion,
        });
          prod.devices.push(device);
          Device.create(device);
          prod.save()
          .then((myproduct)=>{
            Product.findById(myproduct._id)
                  .populate('product.devices')
                  .then((result)=>{
                      res.status.Code=200;
                      res.setHeader('Content-Type','application/json');
                      res.json(result);
                  })
              
          },(err)=>next(err));
      }
      else{
          err = new Error('Product '+ req.params.prod_id + ' not found.');
          err.status = 404;
          return next(err);
      }
  },(err)=>next(err))
  .catch((err)=>next(err));
  });
  


deviceRouter.route('/device/:device_id')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>{
    Device.findById(req.params.device_id)
  //  .populate('product.devices')
    .then((dev)=>{
        if(dev !=null){
            res.status.Code=200;
            res.setHeader('Content-Type','application/json');
            res.json(dev);
        }
        else{
            err = new Error('Device with id =  '+ req.params.device_id + ' not found.');
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})


function process(i){
    return Device.findById(i);
}
const myAsyncLoopFunction = async (array) => {
  const allAsyncResults = []
  for (const item of array) {
    const asyncResult = await process(item)
    if (asyncResult != null)
     allAsyncResults.push(asyncResult)
  }

  return allAsyncResults
}


deviceRouter.route('/devices/:prod_id')
  .options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
  .get(cors.cors,(req,res,next)=>{
    Product.findById(req.params.prod_id)
    .populate('product.devices')
      .then((prod)=>{
          if(prod !=null){
            myAsyncLoopFunction(prod.devices).then((result)=>{
              res.status.Code=200;
              res.setHeader('Content-Type','application/json');
              res.json(result);
            })
             }
          else{
              err = new Error('Product with id '+ req.params.prod_id + ' not found.');
              err.status = 404;
              return next(err);
          }
      },(err)=>next(err))
      .catch((err)=>next(err));
  });
/*
  technicRouter.route('/technic2/:category_id')
  .options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
  .get(cors.cors, (req, res, next) => {
    category.findById(req.params.category_id)
    .populate('category.technics')
    .then((data) => {
      if(data !=null){
        for(var i =(data.technics.length-1); i>=0;i--){
            var tab=[];
            Technics.findById(data)
            .then((tech)=>{
              res.status.Code=200;
              res.setHeader('Content-Type','application/json');
              tab.append(tech);
              res.json(tab);
            })
        }
      }
      else {
        res.json("it's a null");
      }
  
    });
  });*/
  

  module.exports = deviceRouter;