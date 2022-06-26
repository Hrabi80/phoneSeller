import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { MatDialog ,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ListProductsComponent } from '../list-products/list-products.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { product } from 'src/app/models/product';
import { ProductService } from 'src/app/_services/product.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit,OnDestroy {
  productform!: FormGroup;
  productToAdd : product;
  subscription: Subscription 
  subs = new SubscriptionContainer();
  constructor(public dialogRef: MatDialogRef<ListProductsComponent>,
              private fb : FormBuilder,
              private service : ProductService,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {

    this.productform = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3)]],
      description:  [''],
      upPrice:  ['', [Validators.required ]],
      category : [this.data.category],
      photo: [null],
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
