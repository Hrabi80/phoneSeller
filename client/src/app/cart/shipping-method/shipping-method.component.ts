import { Component, OnInit , AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup ,FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { AuthService } from 'src/app/_services/auth.service';
import { CartService } from 'src/app/_services/cart.service';
import { OrderService } from 'src/app/_services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shipping-method',
  templateUrl: './shipping-method.component.html',
  styleUrls: ['./shipping-method.component.scss']
})
export class ShippingMethodComponent implements OnInit,OnDestroy{
  orderForm: FormGroup;
  user! : user;
  cart;
  idCart = localStorage.getItem('cart');
  subs = new SubscriptionContainer();
  constructor(private router :Router,
              private fb : FormBuilder,
              private authService : AuthService,
              private  cartService : CartService,
              private orderService:OrderService) { }
  meetSelection: any;
  ngOnInit(): void {
    let id = localStorage.getItem('myuser_id');
    this.authService.getUserById(id).then((res:any)=>{
      this.user = res.data;
    });
    this.cartService.getCartItems(this.idCart).subscribe((data: any) => {
      this.cart = data.data;
    });

    this.orderForm = this.fb.group({
      username : ['',[Validators.email, Validators.required]],
      firstname : [''],
      lastname : [''],
      phone : ['',[Validators.required]],
      street : ['',[]],
      state : ['',[]],
      zip : ['',[]],
      city : ['',[]],
    });
    

  }
  ngOnDestroy() {
    this.subs.dispose();
  }
  
  cancelOperation(): void {
    localStorage.removeItem('paymentOption');
    localStorage.removeItem('adress');
    this.router.navigate(['/cart']);
  }
  checkMeet():boolean{
    if(this.meetSelection == null)
    return false;
    else return true
  }
  createOrder():void {
    if(!this.checkMeet()){
      Swal.fire(
        'incomplete information!',
        'Please specify meeting method !',
        'error'
      );
    }
    else if(this.orderForm.invalid){
      Swal.fire(
        'incomplete information!',
        'Please verify your e-mail and phone number !',
        'error'
      );
  }
  else{
    let shipping =Object.assign(this.orderForm?.value);
    let paymentOption = {
      paymentMethod:localStorage.getItem('paymentOption'),
      paymentAdress:localStorage.getItem('adress')
    }
    let meeting;
    if (this.meetSelection == 1) meeting = "office"; else meeting ="shipping";
    let cartItems = {
      cart_id : this.cart._id,
      subTotal: this.cart.subTotal,
      owner : this.cart.owner,
      items: this.cart.items
    }
    let orderPayload= Object.assign({meeting:meeting},paymentOption,shipping,cartItems);
    console.log("order payload ============>",orderPayload); 
    this.subs.add= this.orderService.createOrder(orderPayload).subscribe((res)=>{
      console.log("respoinse ==============++++++>",res);
      setTimeout(() => {
        Swal.fire(
          'Thank you !',
          'We received your order, we will contact you soon !',
          'success'
        );
        //this.router.navigate(['/']);
     //   location.reload();
      }, 100);
    })
  }
}

}
