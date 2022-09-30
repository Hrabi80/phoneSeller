import { Component, OnInit,Inject, OnDestroy ,ViewChild} from '@angular/core';
import { MatDialog ,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { device } from 'src/app/models/device';
import { product } from 'src/app/models/product';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { DeviceService } from 'src/app/_services/device.service';
import { ProductService } from 'src/app/_services/product.service';
import { ProductListComponent } from '../product-list/product-list.component';
@Component({
  selector: 'app-characteristics-popup',
  templateUrl: './characteristics-popup.component.html',
  styleUrls: ['./characteristics-popup.component.scss']
})
export class CharacteristicsPopupComponent implements OnInit,OnDestroy {
  subs = new SubscriptionContainer();
  listchar : Array<device>=[];
  product : product;
  @ViewChild('closebutton') closebutton;
  constructor(private service : DeviceService,
              private router : Router,
              private productService : ProductService,
              public dialogRef: MatDialogRef<ProductListComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any) { }

             

  ngOnInit(): void {
    this.subs.add = this.service.getDevices(this.data.prodId).subscribe((res:Array<device>)=>{
        this.listchar = res;
    })
    this.subs.add= this.productService.getProductById(this.data.prodId).subscribe((res:product)=>{
      this.product = res;
    })
  }
  ngOnDestroy() {
    this.subs.dispose();
  }
  goDevice(item , product){
    this.router.navigate(['/products/product-details/'+item+'/'+product])
   setTimeout(() => {
    
    location.reload();
   }, 100);
  }
}
