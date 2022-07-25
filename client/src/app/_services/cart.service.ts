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
  
  addItemToCart(data:any): Observable<any> {
    return this.http.post<any>(this.url + '/cart', data);
  }
  removeItemFromCart(cartId: string,itemId:string): Observable<any> {
    console.log("car id and item ", cartId, itemId);
    return this.http.delete<any>(this.url + '/cart/' + cartId+ '/'+ itemId);
  }
  getCartItems(idCart : string) {
    return this.http.get(this.url+'/cart/'+idCart);
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
