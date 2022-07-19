import { Component, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// Forms
import { FormControl, FormGroup, Validators } from '@angular/forms';
// RXJS
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart';
import { HelperService } from 'src/app/_helper/helper.service';
import { CartService } from 'src/app/_services/cart.service';
import { device } from 'src/app/models/device';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnDestroy {
  cart: Cart;
  cartForm: FormGroup;
  carts;
  cartDetails;
  changesSub$: Subscription;
  idUser;
  lastCartState: string;
  lastDeleteId: string;
  situation:string;
  constructor(private cartService : CartService,
              private router : Router,
              private helperService: HelperService) { }

  ngOnInit(): void {
    this.cartService
      .getCart()
      .subscribe((res:any) => {
        this.cart = res.data;
        this.cartForm = this.toFormGroup(this.cart.devices);
        this.onChanges();
      });

      this.getCart();
  }

  getCart(): void {
    this.cartService.getCartItems(this.idUser).subscribe((data: any) => {
      this.carts = data.data;
      // this.cartDetails = data.data;
      console.log("cart items==>",this.carts);
    });
  }
  _increamentQTY(id, quantity): void {
    const payload = {
      productId: id,
      quantity,
    };
    this.cartService.increaseQty(payload).subscribe(() => {
      this.getCart();
      alert('Product Added');
    });
  }
  _emptyCart(): void {
    this.cartService.emptyCart().subscribe(() => {
      this.getCart();
      alert('Cart Emptied');
    });
  }
  ngOnDestroy(): void {
    
  }

  toFormGroup(devices: device[]): FormGroup {
    const group: any = {};

    devices.forEach(device => {
      group[device._id] = new FormControl(
        device.qty || '', [
          Validators.required,
          Validators.min(1),
          Validators.max(20)
        ]);
    });

    return new FormGroup(group);
  }

  onChanges(): void {
    this.changesSub$ = this.cartForm
      .valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe(val => {
        if (this.lastCartState !== JSON.stringify(val)) {
          this.lastCartState = JSON.stringify(val);
          this.reCalcSum(val,this.situation);
        }
      });
  }

  reCalcSum(formValues: object,situation:string): void {
    let price = 0;
    if(situation == 'new'){
      for (const b of this.cart.devices) {
        price += b.newcondition * formValues[b._id];
      }
    }else if (situation == 'good'){
      for (const b of this.cart.devices) {
        price += b.goodcondition * formValues[b._id];
      }
    }
    else if (situation == 'poor'){
      for (const b of this.cart.devices) {
        price += b.poorcondition * formValues[b._id];
      }
    }
    else if (situation == 'faulty'){
      for (const b of this.cart.devices) {
        price += b.faultycondition * formValues[b._id];
      }
    }
    
    

    this.cart.totalPrice = price;
  }

  onRemove(): void {
    this.cartService
      .removeFromCart(this.lastDeleteId)
      .subscribe(() => {
        this.helperService.cartStatus.next('remove');
        this.cart.devices = this.cart.devices.filter(b => b._id !== this.lastDeleteId);
        this.reCalcSum(this.cartForm.value,'poor');
        //this.removeModalRef.hide();
      });
  }

}
