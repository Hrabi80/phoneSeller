import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ShippingMethodComponent } from './shipping-method/shipping-method.component';



@NgModule({
  declarations: [CartComponent, PaymentMethodComponent, ShippingMethodComponent],
  imports: [
    CommonModule,SharedModule,CartRoutingModule
  ]
})
export class CartModule { }
