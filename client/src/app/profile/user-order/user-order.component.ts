import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/models/order';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent implements OnInit {
  orders: order[];
  constructor(private service : OrderService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('myuser_id');
    this.service.getOrderByUser(id).subscribe((res:any)=>{
      this.orders = res;
      console.log('orderss ===>',res);
    })
  }

}
