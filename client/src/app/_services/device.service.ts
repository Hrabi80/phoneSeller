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

  addDevice(data : device, productId: string): Observable<device> {
    return this.http.post<device>(this.url + '/api/device/'+productId,data)
  }
  getDevices(productId : string):Observable<[device]>{
    return this.http.get<[device]>(this.url + '/devices/'+productId);
  }
  getDeviceById(deviceId:string):Observable<device>{
    return this.http.get<device>(this.url + '/deviceById/'+deviceId);
  }
  deleteDevice(idDevice:string):Observable<any>{
    return this.http.delete(this.url + '/api/device/'+idDevice);
  }
  updateDevice(deviceId:string,data : any ){    
    return this.http.put(this.url + '/api/device/'+deviceId,data);
  }

}
