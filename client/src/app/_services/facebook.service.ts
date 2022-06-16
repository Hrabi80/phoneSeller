import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  //FB: any;
  constructor(private http : HttpClient) { 
    
  }
  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {
          return this.http.post(`http://localhost:3000/users/facebook/token`, {access_token: result.authResponse.accessToken})
              .toPromise()
              .then((response:any )=> {
                var token = response.headers.get('x-auth-token');
                if (token) {
                  localStorage.setItem('id_token', token);
                }
                resolve(response.json());
              })
              .catch(() => reject());
        } else {
          reject();
        }
      }, {scope: 'public_profile,email'})
    });
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get(`http://localhost:3000/api/v1/auth/me`).toPromise().then((response:any) => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }

   testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', (response:any)=> {
      console.log('Successful login for: ' + response.name);
    //  document.getElementById('status').innerHTML =
      console.log(  'Thanks for logging in, ' + response.name + '!');
    });
  }
}
