import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { device } from 'src/app/models/device';
import { ListDevicesComponent } from '../list-devices/list-devices.component';
import { DeviceService } from 'src/app/_services/device.service';
import { product } from 'src/app/models/product';
@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrls: ['./add-devices.component.scss']
})
export class AddDevicesComponent implements OnInit {
  deviceform!: FormGroup;
  deviceToAdd : device;
  subscription: Subscription 
  subs = new SubscriptionContainer();
  constructor(public dialogRef: MatDialogRef<ListDevicesComponent>,
    private fb : FormBuilder,
    private service : DeviceService,
    @Inject(MAT_DIALOG_DATA) public data: product) { }

  ngOnInit(): void {
    this.deviceform = this.fb.group({
      characteristics:  ['', [Validators.required, Validators.minLength(3)]],
      newcondition:  ['',[Validators.required ]],
      goodcondition:  ['', [Validators.required ]],
      poorcondition:  ['', [Validators.required ]],
      faultycondition:  ['', [Validators.required ]],
    })
    console.log("id ======>",this.data._id, "name ==",this.data.name);
  }
  ngOnDestroy() {
    this.subs.dispose();
  }
  addDevice(){
    if (this.deviceform.invalid) {  
      Swal.fire(
        'Your input is invalid!',
        `Please verify all form fields`,
        'error'
      )
    }
    else { 
      this.subs.add =this.service.addDevice(this.deviceform.value,this.data._id).subscribe((res:any) => {
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
