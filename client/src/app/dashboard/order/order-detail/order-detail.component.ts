import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { order } from 'src/app/models/order';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { OrderService } from 'src/app/_services/order.service';
import { DashboardOrderComponent } from '../order-list/dashboard-order.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  subs = new SubscriptionContainer();
  id = this.data;
  order : order;
  constructor(public dialogRef: MatDialogRef<DashboardOrderComponent>,
              private service : OrderService,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.subs.add = this.service.getOrderById(this.id).subscribe((res:order)=>{
      this.order = res;
      console.log('res',res);
    })
  }
  ngOnDestroy() {
    this.subs.dispose();
  }

}
