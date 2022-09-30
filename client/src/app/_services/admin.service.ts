import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { contact } from '../models/contact';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _url = environment.api_url;
  constructor(private _http: HttpClient) { }


  getAllContacts():Observable<Array<contact>>{
    return this._http.get<Array<contact>>(this._url+'/api/contact');
  }
  deleteContact(idContact:string):Observable<any>{
    return this._http.delete(this._url + '/api/contact/'+idContact);
  }
  getService(id){
    return this._http.get(this._url+'/api/service/'+id);
  }
  getCategory(id){
    return this._http.get(this._url+'/api/category/'+id);
  }

  addService(data){
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      return this._http.post(this._url+'/api/service',data, {headers: headers})
  }
  addCategory(data){
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      return this._http.post(this._url+'/api/category',data, {headers: headers})
  }

  
  deleteService(id){
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    return this._http.delete(this._url+'/api/service/'+id,{headers: headers});
  }

  deleteCategory(id):Observable<any>{
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    return this._http.delete(this._url+'/api/category/'+id,{headers: headers});
  }
  deleteGallery(id):Observable<any>{
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    return this._http.delete(this._url+'/api/gallery/'+id,{headers: headers});
  }
  updateService(id,data){
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    return this._http.put(this._url+'/api/service/'+id,data,{headers:headers})
  }
  updateCategory(id,data){
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    return this._http.put(this._url+'/api/category/'+id,data,{headers:headers})
  }






}

