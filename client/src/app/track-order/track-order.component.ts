import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {
  orderForm :FormGroup;
  constructor(private service : OrderService, private fb : FormBuilder) { }
  trackValue;
  status;
  myorder;
  ngOnInit(): void {
    this.orderForm = this.fb.group({
      orderId:  [''],
    })
  }
  track(){
    console.log("oderder id ", this.orderForm.value.orderId)
    this.service.getOrderById(this.orderForm.value.orderId).subscribe((res)=>{
      this.myorder = res;
      this.status = res.status;
    })
  }
}
