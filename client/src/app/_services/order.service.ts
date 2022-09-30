import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = environment.api_url ;
  headers = new HttpHeaders()
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', 'my-auth-token')
  .set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  createOrder(data:order): Observable<order> {
    return this.http.post<order>(this.url + '/order', data);
  }
  deleteOrder(orderId: string): Observable<order> {
    return this.http.delete<order>(this.url + '/order/' + orderId);
  }
  getOrderByUser(idUser : string) {
    return this.http.get(this.url+'/order/user/'+idUser);
  }
  getOrderById(idOrder : string):Observable<order> {
    return this.http.get<order>(this.url+'/order/one/'+idOrder);
  }
  getAllOrders():Observable<Array<order>>{
    return this.http.get<Array<order>>(this.url+'/order/');
  }
  updateStatus(idOrder : string, status:string):Observable<any> {
    return this.http.put<any>(this.url+'/order/'+idOrder,{status:status});
  }
  sendfb(){
    return this.http.get<any>('https://graph.facebook.com/v14.0/PAGE-ID/chat_plugin');
  }
}
