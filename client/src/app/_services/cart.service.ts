import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Cart } from '../models/cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = environment.api_url ;
  headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }
  
  getCartSize(): Observable<number> {
    return this.http.get<number>(this.url + '/cart/size');
  }

  getCart(): Observable<Cart>{
    return this.http.get<Cart>(this.url + '/cart')
      .pipe(
        map((res:any) => {
          res.data.devices.map(b => b.qty = 1);
          return res;
        })
      );
  }

  addToCart(data:any): Observable<Cart> {
    return this.http.post<Cart>(this.url + '/cart/', data);
  }

  removeFromCart(id: string): Observable<Cart> {
    return this.http.delete<Cart>(this.url + '/cart/' + id);
  }
  getCartItems(idUser : string) {
    return this.http.get(this.url+'/cart'+idUser);
  }
  increaseQty(payload) {
    return this.http.post(this.url+'/Incresecart', payload);
  }
  emptyCart() {
    return this.http.delete(this.url+'/cart/empty-cart');
  }

  checkout(payload: object): Observable<object> {
    return this.http.post<object>(this.url + '/checkout', payload);
  }
}
