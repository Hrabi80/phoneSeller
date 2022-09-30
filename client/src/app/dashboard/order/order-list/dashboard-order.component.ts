import { Component, OnDestroy, OnInit } from '@angular/core';
import { order } from 'src/app/models/order';
import { OrderService } from 'src/app/_services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.scss']
})
export class DashboardOrderComponent implements OnInit,OnDestroy {
  orders : order[];
  subs = new SubscriptionContainer();
  constructor(private service : OrderService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.subs.add = this.service.getAllOrders().subscribe((res:Array<order>)=>{
      this.orders = res;
    });  
  }
  ngOnDestroy(): void {
    this.subs.dispose();
  }
  openDetail(id:string) {
    const dialogRef = this.dialog.open(OrderDetailComponent , {data:id});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  updateStatus(id:string , status:string){
    this.subs.add = this.service.updateStatus(id,status).subscribe((res)=>{
        console.log('res',res); 
        Swal.fire('updated','status is updated successfuly! ', 'info');
        setTimeout(() => {
          location.reload();
        }, 3000);
    })
  }
}
