const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('./cors');
var authenticate = require('../authenticate');
const Categories = require('../models/category');

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());


categoryRouter.route('/category')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>{
    Categories.find({})
    .then((cat)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(cat);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

categoryRouter.route('/api/category')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Categories.create(req.body)
    .then((cat)=>{
        console.log('a new category of technics has been recorded',cat);
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:'success!'});
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /api/category');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('Delete operation not supported on /api/category cuz it delete all');
});

categoryRouter.route('/api/category/:id_cat')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Categories.findById(req.params.id_cat)
    .then((cat)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(cat);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /api/category/id');
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Categories.findByIdAndUpdate(req.params.id_cat,{$set: req.body},{new:true})
    .then((cat)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(cat);
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

categoryRouter.route('/category/:id_ser')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Categories.findById(req.params.id_cat)
    .then((cat)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(cat);
    },(err)=>next(err))
    .catch((err)=>next(err))
})


module.exports = categoryRouter;