const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
const Technics = require('../models/technic');
const category = require('../models/category');
//const Services = require('../models/service');



const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/images/technics');
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


const technicRouter = express.Router();
technicRouter.use(bodyParser.json());


technicRouter.route('/api/technic/:category_id')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.post( cors.corsWithOptions, authenticate.verifyUser, upload.single('photo'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    category.findById(req.params.category_id)
    .then((cat)=>{
      if(cat !=null){
        var technics = new Technics({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          description : req.body.description,
          photo: url +'/images/technics/'+ req.file.filename,
          t1 : req.body.t1,
          t2 : req.body.t2,
          t4 : req.body.t3,
          t3 : req.body.t4,
          t5 : req.body.t5,
          t6 : req.body.t6,
        });
          cat.technics.push(technics);
          cat.save()
          .then((cate)=>{
            category.findById(cate._id)
                  .populate('category.technics')
                  .then((cat)=>{
                      res.status.Code=200;
                      res.setHeader('Content-Type','application/json');
                      res.json(cat);
                  })
              
          },(err)=>next(err));
      }
      else{
          err = new Error('Category '+ req.params.category_id + ' not found.');
          err.status = 404;
          return next(err);
      }
  },(err)=>next(err))
  .catch((err)=>next(err));
  
  });
  


technicRouter.route('/technic/:category_id')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>{
    category.findById(req.params.category_id)
  //  .populate('comments.author')
    .then((cat)=>{
        if(cat !=null){
            res.status.Code=200;
            res.setHeader('Content-Type','application/json');
            res.json(cat.technics);
        }
        else{
            err = new Error('Technic '+ req.params.category_id + ' not found.');
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})

technicRouter.route('/technic3/:category_id')
  .options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
  .get(cors.cors,(req,res,next)=>{
    category.findById(req.params.category_id)
     .populate('categorySchema.technics')
      .then((cat)=>{
          if(cat !=null){
              //res.status.Code=200;
              var tab=[];
              for(var i =(cat.technics.length-1); i>=0;i--){
                Technics.findById(cat.technics[i])
                .then((tech)=>{
                  tab.push(tech);
                  console.log("tech ====",pro);
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
              err = new Error('Category '+ req.params.category_id + ' not found.');
              err.status = 404;
              return next(err);
          }
      },(err)=>next(err))
      .catch((err)=>next(err));
  });

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
  });
  

  module.exports = technicRouter;