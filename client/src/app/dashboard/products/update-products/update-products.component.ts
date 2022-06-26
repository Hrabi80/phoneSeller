import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { product } from 'src/app/models/product';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/_services/product.service';
import { ListProductsComponent } from '../list-products/list-products.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.scss']
})
export class UpdateProductsComponent implements OnInit,OnDestroy {
  productform!: FormGroup;
  productToUpdate : product ;
  subs = new SubscriptionContainer();
  constructor(public dialogRef: MatDialogRef<ListProductsComponent>,
              private fb : FormBuilder,
              private service : ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.productform = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3)]],
      description:  [''],
      upPrice:  ['', [Validators.required ]],
      photo: [null],
    });
    this.subs.add = this.service.getProductById(this.data.idProduct).subscribe((res:product)=>{
      this.productToUpdate = res;
      console.log("product",this.productToUpdate);
    })
  }
  ngOnDestroy() {
    this.subs.dispose();
   }

   uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productform.patchValue({
      photo: file
    });
    this.productform.get('photo').updateValueAndValidity()
  }

  updateProduct(){ 
      this.subs.dispose();
      var formData: any = new FormData();
      if(this.productform.get('name').value != null)
      var name = this.productform.get('name').value;
      formData.append("name", name);
      console.log("name ===",name , formData.name);
      formData.append("description", this.productform.get('description').value);
      if(this.productform.get('photo').value != null)
      formData.append("photo", this.productform.get('photo').value);
      if(this.productform.get('upPrice').value != null)
      formData.append("upPrice", this.productform.get('upPrice').value);
      formData.append("devices", this.productToUpdate.devices);

      this.subs.add =this.service.updateProduct(this.data.idProduct ,formData).subscribe((res:any) => {
        console.log("result update ", res);
          setTimeout(() => {
           Swal.fire(
             'Updated !',
             'The product is updated successfully !',
             'success'
           );
           console.log("name ===", this.productform.get('name').value);
         }, 1500);
      });
  }

}
