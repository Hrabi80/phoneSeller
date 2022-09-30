import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { contact } from '../models/contact';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  tel: number;
  private _url = environment.api_url ;
  headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
  constructor(private _http: HttpClient) { }
  addContact(data : contact): Observable<contact>{
    return this._http.post<contact>(this._url + '/contact',data );
  }

  getAllContact(){
    return this._http.get(this._url+ '/api/contact');
  }

  getAllService(){
    return this._http.get(this._url+'/service');
  }
  getAllTechnics():Observable<any>{
    return this._http.get(this._url+'/category');
  }

}
