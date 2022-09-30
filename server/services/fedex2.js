var fedexAPI = require('fedex-nodejs');
 


exports.createShippment = async (req,res)=>{
    var fedex = new fedexAPI({
        account_number: '202007221408293',
      //  meter_number: 'METER_NUMBER',
        key: 'hrabi80',
        password: 'codeo8aA#',
        env: 'test'
    });
    
    fedex.ship({
        // include your data based on the RequestedShipment complex element (see FedEx Ship Service documentation)
        ShipTimestamp: new Date().toISOString(),
        DropoffType: 'REGULAR_PICKUP',
        ServiceType: 'FEDEX_GROUND',
        PackagingType: 'YOUR_PACKAGING',
        // ...
    }, function(err, res) {
        console.log('gellded fedex ', res);
    });

}
