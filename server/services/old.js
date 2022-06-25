
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