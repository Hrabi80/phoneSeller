import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IndexProfileComponent } from './index-profile/index-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { UserInfoComponent } from './user-info/user-info.component';
import { ShippingInfoComponent } from './shipping-info/shipping-info.component';



@NgModule({
  declarations: [
    SidebarComponent,
    IndexProfileComponent,
    UserInfoComponent,
    ShippingInfoComponent
  ],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, MatMenuModule],
  providers : [ShippingInfoComponent,UserInfoComponent]
})
export class ProfileModule { }
