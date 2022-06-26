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
        var device = new Device({
          _id: new mongoose.Types.ObjectId(),
          characteristics: req.body.characteristics,
          islocked : req.body.islocked,
          newcondition : req.body.newcondition,
          goodcondition: req.body.goodcondition,
          poorcondition: req.body.poorcondition,
          faultycondition: req.body.faultycondition,
          productId : req.params.prod_id
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
              
          },(err)=>{
            next(err);
          });
      }
      else{
          err = new Error('Product '+ req.params.prod_id + ' not found.');
          err.status = 404;
          return next(err);
      }
  },(err)=>next(err))
  .catch((err)=>next(err));
  });
  


deviceRouter.route('/api/device/:device_id')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
  Device.findByIdAndRemove(req.params.device_id)
  .then((resp)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(resp);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
  Device.findByIdAndUpdate({ _id: req.params.device_id }, { $set: req.body },{new:true})
  .then((resp)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(resp);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
;


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
  
deviceRouter.route('/deviceById/:id_device')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.corsWithOptions,(req,res,next)=>{
    Device.findById(req.params.id_device)
    .then((device)=>{
        if(device !=null){
            res.status.Code=200;
            res.setHeader('Content-Type','application/json');
            res.json(device);
        }
        else{
            err = new Error('device '+ req.params.id_device + ' not found.');
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})

  module.exports = deviceRouter;