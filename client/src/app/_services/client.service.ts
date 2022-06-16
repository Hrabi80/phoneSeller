import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  tel: number;
  private _url = environment.api_url ;
  constructor(private _http: HttpClient) { }
  addContact(data){
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    return this._http.post(this._url + '/contact',data , {
      headers: headers
    });
  }
  getAllContact(){
    return this._http.get(this._url+ '/api/contact');
  }

  getGallery():Observable<any>{
    return this._http.get(this._url+'/gallery').pipe(
      catchError(this.errorMgmt)
    );
  }

  sendDevis(data){
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    return this._http.post(this._url+'/devis',data, {
      headers: headers
    });
  }

  getAllService(){
    return this._http.get(this._url+'/service');
  }
  getAllTechnics():Observable<any>{
    return this._http.get(this._url+'/category');
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getProductByCategory(id): Observable<any>{
    return this._http.get(this._url+'/product/'+id).pipe(
      catchError(this.errorMgmt)
    )
  }
  getTechnicsByCategory(id): Observable<any>{
    return this._http.get(this._url+'/technic/'+id).pipe(
      catchError(this.errorMgmt)
    )
  }
}
