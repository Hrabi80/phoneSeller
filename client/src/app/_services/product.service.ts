import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.api_url ;
  headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  addProduct(prod : product): Observable<product> {
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    return this.http.post<product>(this.url + '/api/product',prod)
  }

  getProducts(categoryname : string):Observable<[product]>{
    return this.http.get<[product]>(this.url + '/product/'+categoryname);
  }
  getProductById(productId:string):Observable<product>{
    return this.http.get<product>(this.url + '/productById/'+productId);
  }
  deleteProduct(idProduct:string):Observable<any>{
    return this.http.delete(this.url + '/api/product/'+idProduct);
  }
  updateProduct(productId:string,data : any ){ 
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    return this.http.put(this.url + '/api/product/'+productId,data);
  }

}
