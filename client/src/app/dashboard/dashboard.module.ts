import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardSavedItemComponent } from './dashboard-saved-item/dashboard-saved-item.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { UpdateProductsComponent } from './products/update-products/update-products.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardIndexComponent,
    DashboardSavedItemComponent,
    DashboardProfileComponent,
    DashboardOrderComponent,
    ListProductsComponent,
    AddProductsComponent,
    UpdateProductsComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, MatMenuModule],
  providers : [AddProductsComponent,UpdateProductsComponent]
})
export class DashboardModule {}
