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
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnDestroy {
  cartForm: FormGroup;
  cart;
  cartDetails;
  changesSub$: Subscription;
  idCart = localStorage.getItem('cart');
  lastCartState: string;
  lastDeleteId: string;
  situation:string;
  cartItems = [];
  constructor(private cartService : CartService,
              private router : Router,
              private helperService: HelperService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCartItems(this.idCart).subscribe((data: any) => {
      this.cart = data.data;
      // this.cartDetails = data.data;
      this.cartItems= data.data.items;
    });
  }

  remove(id:string){
    Swal.fire({
      // type:'warning',
       title: 'Remove item',
       text: 'Are you sure you want to delete this item from cart ?',
       showCancelButton: true,
       confirmButtonColor: '#ff0000',
       cancelButtonColor:'#049F0C',
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, keep it',
     }).then((res) => {
       if (res.value) {
         this.cartService.removeItemFromCart(this.idCart,id).subscribe(
           data => {
             console.log(data);
             Swal.fire(
               'Removed !',
               'Ce service est supprimé.',
               'success'
             );
             const index = this.cartItems.findIndex(x => x._id === id);
               this.cartItems.splice(index, 1);
           });
       }else{
         Swal.fire(
           'Canceled!',
           'This operation is canceled.',
           'success'
         )
       }
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
        }
      });
  }

 

  

}
