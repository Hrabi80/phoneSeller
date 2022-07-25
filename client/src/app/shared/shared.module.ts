import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeatureComponent } from './components/feature/feature.component';
import { MatCardModule } from '@angular/material/card';
import { BaseLayoutComponent } from './components/layouts/base-layout/base-layout.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { FancyCardsComponent } from './components/fancy-cards/fancy-cards.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule ,FormsModule,Validators} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { FilterPipe } from './filter.pipe';


const commonModules = [
  HttpClientModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule,
  MatMenuModule,
  MatRadioModule
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, FeatureComponent, BaseLayoutComponent, LoaderComponent, SidenavComponent, FancyCardsComponent, FilterPipe],
  imports: [CommonModule, RouterModule, ...commonModules,FormsModule,
           ReactiveFormsModule],
  exports: [HeaderComponent, FooterComponent, BaseLayoutComponent, FeatureComponent, LoaderComponent, SidenavComponent,FancyCardsComponent, ...commonModules,
    FormsModule,
  ReactiveFormsModule,
  
  ],
  
})
export class SharedModule {}
