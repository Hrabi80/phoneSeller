import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexProfileComponent } from './index-profile/index-profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const DashboardChildrenRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: IndexProfileComponent
  },

];

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: DashboardChildrenRoute
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}