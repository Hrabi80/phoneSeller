import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Subject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
import { user } from '../models/user';
interface myData {
  success: boolean,
  message: string
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private loggedInStatus = false;
  private _url = environment.api_url ;
  headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
  constructor(private _http: HttpClient) {
   }

   signup(data:any) {
    return new Promise(resolve => {
      this._http.post(this._url + '/users/signup', data , {headers:this.headers}).subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }

   login(username: string, password: string): Observable<boolean> {
    return this._http.post<{token: string}>(this._url+'/users/login', {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          localStorage.setItem('isLoggedIn','true'); 
          return true;
        })
      );
  }

  register(username: string, password: string){
    return this._http.post<{token: string}>(this._url+'/users/register', {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          console.log(localStorage);
          return true;
        })
      );
  }
  getUsers(){
    return this._http.get<[user]>(this._url + '/users/');
  }
  getUserById(id:any){
    return new Promise(resolve => {
      this._http.get(this._url + '/users/getUserById/'+id).subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }

  updateUser(id:any,data:user){
    console.log("daataa to update ", data);
    return this._http.put(this._url + '/users/api/updateUser/'+id,data);
  }
    
  getToken() {
    return localStorage.getItem('access_token');
  }


  loggedIn() {
    if(localStorage.getItem('access_token') == null || localStorage.getItem('access_token') == undefined )
      return false;
    else 
    return true;
  }


  jwt:any;
  isadmin: any;
  isAdmin(){
    this.isadmin = localStorage.getItem('isAdmin');
    if(this.isadmin== 'true')
    return true;
    else return false;
  }
  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('access_token');    
    localStorage.removeItem('myuser_id');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('cart');
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }    
}
