import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})

export class JwtInterceptor implements HttpInterceptor {
    private _URLPattern = environment.api_url+'/api';
    constructor(private auth: AuthService ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       //console.log('intercepted', req);
        if(req.url.startsWith(this._URLPattern)){
          const token = this.auth.getToken();
         //  let token:any = JSON.stringify(localStorage.getItem('access_token')).token;
      //    const user = JSON.parse(localStorage.getItem('access_token'));
   //     let token:any = user.token;
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
        return next.handle(req);
    }
}