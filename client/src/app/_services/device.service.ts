import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { product } from '../models/product';
import { device } from '../models/device';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private url = environment.api_url ;
  headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  addDevice(data : device): Observable<product> {
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    return this.http.post<product>(this.url + '/api/product',data)
  }
  getDevices(productId : string):Observable<[device]>{
    return this.http.get<[device]>(this.url + '/device/'+productId);
  }
  getDeviceById(productId:string):Observable<product>{
    return this.http.get<product>(this.url + '/productById/'+productId);
  }
  deleteDevice(idProduct:string):Observable<any>{
    return this.http.delete(this.url + '/api/product/'+idProduct);
  }
  updateDevice(productId:string,data : any ){    
    return this.http.put(this.url + '/api/product/'+productId,data);
  }

}
