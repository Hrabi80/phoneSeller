import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { device } from 'src/app/models/device';
import { product } from 'src/app/models/product';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { DeviceService } from 'src/app/_services/device.service';
import { ProductService } from 'src/app/_services/product.service';
import Swal from 'sweetalert2';
import { AddDevicesComponent } from '../add-devices/add-devices.component';
import { UpdateDevicesComponent } from '../update-devices/update-devices.component';
@Component({
  selector: 'app-list-devices',
  templateUrl: './list-devices.component.html',
  styleUrls: ['./list-devices.component.scss']
})
export class ListDevicesComponent implements OnInit,OnDestroy {
  devices : Array<device>=[];
  product : product;
  prodId : string;
  subs = new SubscriptionContainer();
  constructor(public dialog: MatDialog,
              private router : ActivatedRoute,
              private service : DeviceService,
              private productService : ProductService
              ) { }

  ngOnInit(): void {
    this.prodId = this.router.snapshot.paramMap.get('productId');
    this.subs.add = this.service.getDevices(this.prodId).subscribe((res:Array<device>)=>{
      this.devices = res;
    });
    this.subs.add = this.productService.getProductById(this.prodId).subscribe((res:product)=>{
      this.product = res;
    });
  }
  ngOnDestroy(): void {
    this.subs.dispose();
  }
  openAddDevice() {
    const dialogRef = this.dialog.open(AddDevicesComponent , {data:this.product});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openUpdateDevice(id:string) {
    const dialogRef2 = this.dialog.open(UpdateDevicesComponent , {data:{deviceId:id}});
    dialogRef2.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  deleteDevice(id:string){
    Swal.fire({
      title: 'Are you sure you want to delete this device ?',
      text: 'The data of this devices will be removed',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor:'#049F0C',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((res) => {
      if (res.value) {
        this.service.deleteDevice(id).subscribe(
          data => {
            console.log(data);
            Swal.fire(
              'Deleted!',
              'This device is deleted.',
              'success'
            );
            const index = this.devices.findIndex(x => x._id === id);
              this.devices.splice(index, 1);
          });
      }else{
        Swal.fire(
          'Canceled!',
          'This operation is canceled.',
          'success'
        )
      }
    });
  }

}
