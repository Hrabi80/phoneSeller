import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeProductsComponent } from './home-products/home-products.component';
import { NgParticlesModule } from 'ng-particles';
import { VideoSectionComponent } from './home-components/video-section/video-section.component';
import { HowItWorksIiComponent } from './home-components/how-it-works-ii/how-it-works-ii.component';
import { CategoryComponent } from './home-components/category/category.component';

@NgModule({
  declarations: [HomeComponent, HomeProductsComponent, VideoSectionComponent, HowItWorksIiComponent, CategoryComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, NgParticlesModule]
})
export class HomeModule {}
