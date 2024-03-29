import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AuthGuard } from './_helper/auth.guard'; 
import { JwtInterceptor } from './_helper/jwt.interceptor';
import { ErrorIntercept } from './_helper/error.interceptor';

import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FacebookService } from './_services/facebook.service';
import { environment } from 'src/environments/environment';
import { AdminGuard } from './_helper/admin.guard';
import { FilterPipe } from './filter.pipe';

import { FacebookModule } from 'ngx-facebook';
import { MessengerTestComponent } from './messenger-test/messenger-test.component';
import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { TrackOrderComponent } from './track-order/track-order.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

declare const FB:any;
declare const window : any;
export function appInitializer(accountService: FacebookService) {
  return () => new Promise(resolve => {
      // wait for facebook sdk to initialize before starting the angular app
      window.fbAsyncInit = function() {
        FB.init({
          appId      : environment.facebok_id,
          cookie     : true,
          xfbml      : true,
          version    : 'v14.0'
        });
          console.log("... Test  fb for LOGIN perpose ... ");
        FB.AppEvents.logPageView();   
      };
    
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));   
  });
}


@NgModule({
  declarations: [AppComponent, FilterPipe, MessengerTestComponent, TrackOrderComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SocialLoginModule,
    FacebookModule.forRoot(),
 ],
  providers: [
    AuthGuard,
    AdminGuard,
    TrackOrderComponent,
    JwtInterceptor,
    {provide:LocationStrategy,useClass:HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true,
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
    //APP_INITIALIZER
    //useFactory: () => appInitializer,  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
