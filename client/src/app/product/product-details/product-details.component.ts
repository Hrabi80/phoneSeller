import { Component, OnInit , OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { device } from 'src/app/models/device';
import { product } from 'src/app/models/product';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { DeviceService } from 'src/app/_services/device.service';
import { ProductService } from 'src/app/_services/product.service';
declare var $:any;

@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit,OnDestroy {
  id:string;
  prodId :string;
  constructor(private router : ActivatedRoute,
              private service : DeviceService,
              private productService : ProductService
              ) { }
  device : device;
  product :product;
  subs= new SubscriptionContainer();
  opt : number=0;
  conditions =[];
  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.prodId = this.router.snapshot.paramMap.get('prodId');
    this.subs.add = this.service.getDeviceById(this.id).subscribe((res:device)=>{
      this.device = res;
      this.conditions = [
        {description:"LIKE NEW: FLAWLESS CONDITION NOT A SINGLE SCRATCH" , price: this.device?.newcondition},
        {description:"GOOD: SOME SCRATCHES SHOWS SIGNS OF USE" , price: this.device?.goodcondition},
        {description:"POOR: CRACKS FRONT AND/OR BACK CRACKED SCREEN MUST STILL BE FLAWLESS CONDITION!" , price: this.device?.poorcondition},
        {description:"FAULTY: BAD LCD AND/OR DOESN'T TURN ON, ANY SPEAKERS MICS CAMERAS FAIL (IF ANY ARE TRUE DEVICE IS FAULTY" , price: this.device?.faultycondition}
      ]
  });
    this.subs.add = this.productService.getProductById(this.prodId).subscribe((res:product)=>{
      this.product = res;
    })
 } 
 ngOnDestroy(): void {
  this.subs.dispose();
 }
 selectOption(val) {
  console.log("valueeee",val.value);
    this.opt=val.value;
   console.log("heeeeere",this.conditions[this.opt].description)
}

}
