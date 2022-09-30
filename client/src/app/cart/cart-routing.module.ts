import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ShippingMethodComponent } from './shipping-method/shipping-method.component';


const routes: Routes = [
  {
    path: '',
    component: CartComponent
  },
  {
    path:'payment-method',
    component: PaymentMethodComponent
  },
  {
    path:'shipping-method',
    component: ShippingMethodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {}
