const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
const Products = require('../models/productold');
const Service = require('../models/service');
const Services = require('../models/service');



const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/images/products');
    },
    filename: (req,file , cb)=>{
        cb(null,file.originalname)
    }
});

const imageFileFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('You can upload only image files!'),false);
    }
    cb(null,true);
}
const upload  = multer({storage:storage,fileFilter:imageFileFilter});


const productRouter = express.Router();
productRouter.use(bodyParser.json());


productRouter.route('/api/product/:service_id')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.post( cors.corsWithOptions, authenticate.verifyUser, upload.single('photo'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    Service.findById(req.params.service_id)
    .then((service)=>{
      if(service !=null){
        var pro = new Products({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          description : req.body.description,
          photo: url +'/images/products/'+ req.file.filename,
          p1 : req.body.p1,
          p2 : req.body.p2,
          p4 : req.body.p3,
          p3 : req.body.p4,
          p5 : req.body.p5,
          p6 : req.body.p6,
        });
          service.products.push(pro);
          service.save()
          .then((service)=>{
              Service.findById(service._id)
                  .populate('service.products')
                  .then((ser)=>{
                      res.status.Code=200;
                      res.setHeader('Content-Type','application/json');
                      res.json(ser);
                  })
              
          },(err)=>next(err));
         // res.json(dish.comments);
      }
      else{
          err = new Error('Service '+ req.params.service_id + ' not found.');
          err.status = 404;
          return next(err);
      }
  },(err)=>next(err))
  .catch((err)=>next(err));
  
  });
  


productRouter.route('/product/:service_id')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>{
  Services.findById(req.params.service_id)
  //  .populate('comments.author')
    .then((ser)=>{
        if(ser !=null){
            res.status.Code=200;
            res.setHeader('Content-Type','application/json');
            res.json(ser.products);
        }
        else{
            err = new Error('produuct '+ req.params.service_id + ' not found.');
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})

  productRouter.route('/product3/:service_id')
  .options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
  .get(cors.cors,(req,res,next)=>{
    Services.findById(req.params.service_id)
     .populate('serviceSchema.products')
      .then((ser)=>{
          if(ser !=null){
              //res.status.Code=200;
              var tab=[];
              for(var i =(ser.products.length-1); i>=0;i--){
                Products.findById(ser.products[i])
                .then((pro)=>{
                  tab.push(pro);
                  console.log("pro ====",pro);
                  console.log("tab ====",tab);
                 // res.json(tab);
                })
              }
              res.status.Code=200;
              res.setHeader('Content-Type','application/json');
              console.log("tab ====",tab);
              res.json(tab);
           //   res.json(ser.products);
          }
          else{
              err = new Error('Service '+ req.params.service_id + ' not found.');
              err.status = 404;
              return next(err);
          }
      },(err)=>next(err))
      .catch((err)=>next(err));
  });

  productRouter.route('/product2/:service_id')
  .options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
  .get(cors.cors, (req, res, next) => {
    Services.findById(req.params.service_id)
    .populate('service.products')
    .then((data) => {
      if(data !=null){
        for(var i =(data.products.length-1); i>=0;i--){
            var tab=[];
            Products.findById(data)
            .then((pro)=>{
              res.status.Code=200;
              res.setHeader('Content-Type','application/json');
              tab.append(pro);
              res.json(tab);
            })
        }
      }
      else {
        res.json("it's a null");
      }
    //  res.status.Code=200;
     // res.setHeader('Content-Type','application/json');
     // res.json(data.products);
      /*
      res.status(200).json({
        message: "products retrieved successfully!",
        products: data
      });*/
    });
  });
  

  module.exports = productRouter;