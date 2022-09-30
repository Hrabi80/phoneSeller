import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardOrderComponent } from './order/order-list/dashboard-order.component';
import { DashboardSavedItemComponent } from './dashboard-saved-item/dashboard-saved-item.component';
import { ListDevicesComponent } from './devices/list-devices/list-devices.component';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { UsersListComponent } from './users-list/users-list.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';

const DashboardChildrenRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardIndexComponent
  },
  {
    path:'list-products/:category'  , component:ListProductsComponent
  },
  {
    path:'add-product/:category' , component : AddProductsComponent
  },
  {
    path:'list-devices/:productId'  , component:ListDevicesComponent
  },
  {
    path: 'saved-items',
    component: DashboardSavedItemComponent
  },
  {
    path: 'users',
    component: UsersListComponent
  },
  {
    path: 'orders',
    component: DashboardOrderComponent
  },

];

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: DashboardChildrenRoute
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
