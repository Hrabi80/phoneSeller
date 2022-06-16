import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _url = environment.api_url;
  constructor(private _http: HttpClient) { }


  getAllService(){
    return this._http.get(this._url+'/service');
  }
  getAllCategories(): Observable<any>{
    return this._http.get(this._url+'/category').pipe(
      catchError(this.errorMgmt)
    );
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
  addGallery(data){
      return this._http.post(this._url+'/api/gallery',data, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(catchError(this.errorMgmt))
        
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

   // UPLOAD  PRODUCT 

   addProduct(data,id): Observable<any> {
    return this._http.post(this._url+'/api/product/'+id, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }
 // UPLOAD TECHNIC
  addTechnic(data,id): Observable<any> {
    return this._http.post(this._url+'/api/technic/'+id, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
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


  //GET PRODDUCT

  GetProductByService(id): Observable<any>{
    return this._http.get(this._url+'/product/'+id).pipe(
      catchError(this.errorMgmt)
    )
  }

  GetTechs(id): Observable<any>{
    return this._http.get(this._url+'/technic/'+id).pipe(
      catchError(this.errorMgmt)
    )
  }

}

