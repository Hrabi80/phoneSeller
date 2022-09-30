import { Component, OnInit , OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { device } from 'src/app/models/device';
import { product } from 'src/app/models/product';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { AuthService } from 'src/app/_services/auth.service';
import { CartService } from 'src/app/_services/cart.service';
import { DeviceService } from 'src/app/_services/device.service';
import { ProductService } from 'src/app/_services/product.service';
import Swal from 'sweetalert2';
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
              private cartService: CartService,
              private productService : ProductService,
              private authService : AuthService
              ) { }
  device : device;
  product :product;
  subs= new SubscriptionContainer();
  opt : number=0;
  conditions =[];
  isLoggedIn = false;
  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.prodId = this.router.snapshot.paramMap.get('prodId');
    this.isLoggedIn = this.authService.loggedIn();
    this.subs.add = this.service.getDeviceById(this.id).subscribe((res:device)=>{
      this.device = res;
      this.conditions = [
        {description:"BRAND NEW: IN THE BOX , NEVER BEEN USED" , price: this.device?.newcondition},
        {description:"LIKE NEW: FLAWLESS CONDITION NOT A SINGLE SCRATCH" , price: this.device?.goodcondition},
        {description:"GOOD: SOME SCRATCHES SHOWS SIGNS OF USE" , price: this.device?.poorcondition},
        {description:"POOR: CRACKS FRONT AND/OR BACK CRACKED SCREEN MUST STILL BE FLAWLESS CONDITION!" , price: this.device?.faultycondition}
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
    let myreturn;
      this.opt=val.value;
      myreturn = val.value;
    return myreturn;
  }

  addItemToCart(id:string){
    let condition;
    console.log("opt value ", this.opt);
    if(this.opt == 0)condition='newcondition';
    if(this.opt == 1)condition='goodcondition';
    if(this.opt == 2)condition='poorcondition';
    if(this.opt == 3)condition='faultycondition';
 
    let cartId = localStorage.getItem("cart")
    let payload = {
      deviceId: id,
      cartId:cartId,
      condition :condition
    }
 
    this.cartService.addItemToCart(payload).subscribe((res:any)=>{
      Swal.fire(
        `Done`,
        'The item is added to your cart !',
        'success'
      )
      setTimeout(() => {
        location.reload();
      }, 500);
    })
  }

}
