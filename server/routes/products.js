const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('./cors');
const multer = require('multer');
var authenticate = require('../authenticate');
const Products = require('../models/product');

const productRouter = express.Router();
productRouter.use(bodyParser.json());

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

productRouter.route('/product/:categoryId')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.corsWithOptions,(req,res,next)=>{
    Products.find({})
    .where('category').equals(req.params.categoryId)
    .then((products)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(products);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

productRouter.route('/api/product')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,upload.single('photo'),
 (req,res,next)=>{
    const url = req.protocol + '://' + req.get('host');
    var pro = new Products({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description : req.body.description,
        photo: url +'/images/products/'+ req.file.filename,
        category : req.body.category,
        upPrice: req.body.upPrice,
      });
    Products.create(pro)
    .then((prod)=>{
        console.log('a new product has been recorded',prod);
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:'success!'});
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('Delete operation not supported on /api/service cuz it delete all');
});

productRouter.route('/api/product/:id_prod')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Products.findById(req.params.id_prod)
    .then((prod)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(prod);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on sercice/id');
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin ,(req,res,next)=>{
    Products.findByIdAndUpdate(req.params.id_prod,{$set: req.body},{new:true})
    .then((prod)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(prod);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Products.findByIdAndRemove(req.params.id_prod)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

productRouter.route('/productById/:id_prod')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.corsWithOptions,(req,res,next)=>{
    Products.findById(req.params.id_prod)
    .then((prod)=>{
        if(prod !=null){
            res.status.Code=200;
            res.setHeader('Content-Type','application/json');
            console.log("prodddd)===>",prod);
            res.json(prod);
        }
        else{
            console.log("prodddd)nooo===>",prod);
            err = new Error('produuct '+ req.params.id_prod + ' not found.');
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})


module.exports = productRouter;