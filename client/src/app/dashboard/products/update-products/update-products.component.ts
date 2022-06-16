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
  productToUpdate : product;
  path = environment.api_url+'/public/images/products/';
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
      category : ['', [Validators.required ]],
      photo: [null],
    });
    this.subs.add = this.service.getProductById(this.data.idProduct).subscribe((res:product)=>{
      this.productToUpdate = res;
      console.log('productx==>',this.productToUpdate);
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

  addProduct(){
    if (this.productform.invalid) {  
      Swal.fire(
        'Your input is invalid!',
        `Please verify all form fields`,
        'error'
      )
    }
    else { 
      var formData: any = new FormData();
      formData.append("name", this.productform.get('name').value);
      formData.append("category", this.productform.get('category').value);
      formData.append("description", this.productform.get('description').value);
      formData.append("photo", this.productform.get('photo').value);
      formData.append("upPrice", this.productform.get('upPrice').value);
      this.subs.add =this.service.addProduct(formData).subscribe((res:any) => {
          setTimeout(() => {
           Swal.fire(
             'added !',
             'new product is added to the database !',
             'success'
           );
         }, 1500);
      });
  }
  }

}
