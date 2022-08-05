import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import Swal from 'sweetalert2';
import { user } from 'src/app/models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { IndexProfileComponent } from '../index-profile/index-profile.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userform!: FormGroup;
  userToUpdate = this.data.user ;
  subs = new SubscriptionContainer();
  constructor(public dialogRef: MatDialogRef<IndexProfileComponent>,
    private fb : FormBuilder,
    private service : AuthService,
@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log("user info ===>",this.data.user);
    this.userform = this.fb.group({
      username:  ['', [Validators.required, Validators.email]],
      firstname:  [''],
      lastname:  [''],
      phone:  [''],
      password: ['',[Validators.required]]
    });
  }
  ngOnDestroy() {
    this.subs.dispose();
   }

   updateUser(){ 
    this.subs.dispose();
    this.subs.add =this.service.updateUser(this.data.user._id ,this.userform.value).subscribe((res:any) => {
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
