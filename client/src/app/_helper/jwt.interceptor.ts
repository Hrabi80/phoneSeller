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
    private _URLPattern2 = environment.api_url+'/users/api';
    constructor(private auth: AuthService ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       //console.log('intercepted', req);
        if(req.url.startsWith(this._URLPattern) || req.url.startsWith(this._URLPattern2)){
          const token = this.auth.getToken();
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
        return next.handle(req);
    }
}