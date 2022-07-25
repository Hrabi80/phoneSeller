import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog ,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/models/product';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { ProductService } from 'src/app/_services/product.service';

import { AddProductsComponent } from '../add-products/add-products.component';
import Swal from 'sweetalert2';
import { UpdateProductsComponent } from '../update-products/update-products.component';
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit,OnDestroy {
  products : Array<product>=[];
  cat : string;
  subs = new SubscriptionContainer();
  constructor(public dialog: MatDialog,
              private router : ActivatedRoute,
              private service : ProductService
              ) {}

  ngOnInit(): void {
    this.cat = this.router.snapshot.paramMap.get('category');
    this.subs.add = this.service.getProducts(this.cat).subscribe((res:Array<product>)=>{
      this.products = res;
    });
  }
  ngOnDestroy(): void {
    this.subs.dispose();
  }
  openAddProduct() {
    const dialogRef = this.dialog.open(AddProductsComponent , {data:{category:this.cat}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openUpdateProduct(id:string) {
    const dialogRef2 = this.dialog.open(UpdateProductsComponent , {data:{idProduct:id}});
    dialogRef2.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  deleteProduct(id:string){
    Swal.fire({
     // type:'warning',
      title: 'Are you sure you want to delete this product ?',
      text: 'All the devices in this products will be removed also',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor:'#049F0C',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((res) => {
      if (res.value) {
        this.service.deleteProduct(id).subscribe(
          data => {
            console.log(data);
            Swal.fire(
              'Deleted!',
              'The product is deleted !',
              'success'
            );
            const index = this.products.findIndex(x => x._id === id);
              this.products.splice(index, 1);
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
