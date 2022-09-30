import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import Swal from 'sweetalert2';
import { user } from 'src/app/models/user';
import { IndexProfileComponent } from '../index-profile/index-profile.component';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.scss']
})
export class ShippingInfoComponent implements OnInit {
  userform!: FormGroup;
  userToUpdate : user = this.data.user ;
  subs = new SubscriptionContainer();
  constructor(public dialogRef: MatDialogRef<IndexProfileComponent>,
    private fb : FormBuilder,
    private service : AuthService,
@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userform = this.fb.group({
      street:  [''],
      city:  [''],
      state:  [''],
      zip:  [''],
      paypal:  [''],
      zelle:  [''],
    });
  }
  ngOnDestroy() {
    this.subs.dispose();
   }

   updateUser(){ 
    this.subs.dispose();
    this.subs.add =this.service.updateUser(this.data.user._id ,this.userform.value).subscribe((res:any) => {
      console.log("result update ", res);
        setTimeout(() => {
         Swal.fire(
           'Updated !',
           'your information is updated successfully !',
           'success'
         );
       }, 800);
    });
  }

}
