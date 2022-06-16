const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
const Galleries = require('../models/gallery');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/images/gallery');
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

const galleryRouter = express.Router();
galleryRouter.use(bodyParser.json());

galleryRouter.route('/api/gallery/')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.post( cors.corsWithOptions, authenticate.verifyUser, upload.single('photo'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    var gal = new Galleries({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description : req.body.description,
        photo: url +'/images/gallery/'+ req.file.filename,
      });
    Galleries.create(gal)
    .then((serv)=>{
        console.log('a new gallery has been recorded',serv);
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:'success!'});
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on gallery');
});

galleryRouter.route('/gallery')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>{
    Galleries.find({})
    .then((gal)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(gal);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

galleryRouter.route('/api/gallerry/:id_gal')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Galleries.findByIdAndRemove(req.params.id_gal)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = galleryRouter;