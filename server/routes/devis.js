const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('./cors');
var authenticate = require('../authenticate');
const Devis = require('../models/devi');

const deviRouter = express.Router();
deviRouter.use(bodyParser.json());

deviRouter.route('/api/devis')
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Devis.find({})
    .then((dev)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(dev);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
deviRouter.route('devis')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.post(cors.corsWithOptions,(req,res,next)=>{
    Devis.create(req.body)
    .then((cont)=>{
        console.log('a new appointment has been recorded',cont);
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:'success!'});
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /DEVS');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Devis.remove({})
    .then((resp)=>{
        res.status.Code=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});
/*
deviRouter.route('/:id_mess')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Devis.findById(req.params.id_mess)
    .then((cont)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(cont);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on devis/id');
})
.put(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /devis/:id');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Devis.findByIdAndRemove(req.params.id_mess)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});
*/

module.exports = deviRouter;