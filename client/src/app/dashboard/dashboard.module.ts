import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardSavedItemComponent } from './list-contacts/dashboard-saved-item.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { UpdateProductsComponent } from './products/update-products/update-products.component';
import { ListDevicesComponent } from './devices/list-devices/list-devices.component';
import { AddDevicesComponent } from './devices/add-devices/add-devices.component';
import { UpdateDevicesComponent } from './devices/update-devices/update-devices.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardIndexComponent,
    DashboardSavedItemComponent,
    DashboardProfileComponent,
    DashboardOrderComponent,
    ListProductsComponent,
    AddProductsComponent,
    UpdateProductsComponent,
    ListDevicesComponent,
    AddDevicesComponent,
    UpdateDevicesComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, MatMenuModule],
  providers : [AddProductsComponent,UpdateProductsComponent]
})
export class DashboardModule {}
