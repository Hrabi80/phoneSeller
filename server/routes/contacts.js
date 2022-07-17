const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('./cors');
var authenticate = require('../authenticate');
const Contacts = require('../models/contact');

const contactRouter = express.Router();
contactRouter.use(bodyParser.json());

contactRouter.route('/api/contact')
.get(cors.cors,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Contacts.find({})
    .then((contacts)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(contacts);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
contactRouter.route('/contact')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.post(cors.corsWithOptions,(req,res,next)=>{
    Contacts.create(req.body)
    .then((cont)=>{
        console.log('a new message has been recorded',cont);
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:'success!'});
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /contacts');
})


contactRouter.route('/api/contact/:id_mess')
.options(cors.corsWithOptions,authenticate.verifyUser, (req,res)=>{ res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>{
    Contacts.findById(req.params.id_mess)
    .then((cont)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(cont);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on contacts/id');
})
.put(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /contacts/:id');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Contacts.findByIdAndRemove(req.params.id_mess)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


module.exports = contactRouter;