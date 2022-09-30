
      function myfoorLoop(devices){
        var tab =[];
        for(var i =(devices.length-1); i>=0;i--){
          // prod.devices.length-1
        //  var tab = [];
          //Device.find({})
          // .where('productId').equals(prod.devices[i])
          
          Device.findById(devices[i])
          //  Device.findById(prod.devices[i])
          .then((dev)=>{
           if(dev != null){
              tab.push(dev);
          }
          })
        }
          return tab;
      }
      function  waitmyfoorLoop(devices){
        return new Promise(() => {
          myfoorLoop(devices);
        });
       
      }



       // Products.findByIdAndUpdate(req.params.id_prod,{$set: req.body},{new:true})
    //   .then((prod)=>{
    //         res.status.code=200;
    //         res.setHeader('Content-Type','application/json');
    //         res.json(prod);
    //      },(err)=>next(err))
    //         .catch((err)=>next(err));



    function initializeProduct(id,req){
      if(req.file){
         var pro = new Products({
              _id : id,
              name: req.body.name,
              description : req.body.description,
              photo: url +'/images/products/'+ req.file.filename,
              category : req.body.category,
              upPrice: req.body.upPrice,
             // devices : req.body.devices
            });
      }else {
        var pro = new Products({
          _id : id,
          name: req.body.name,
          description : req.body.description,
          category : req.body.category,
          upPrice: req.body.upPrice,
        //  devices : [req.body.devices]
        }); 
      }
      setTimeout(() => {
          console.log("product to update in inity",pro,"devices :", req.body.devices);
          return pro;
      }, 3600);
      
     
  }