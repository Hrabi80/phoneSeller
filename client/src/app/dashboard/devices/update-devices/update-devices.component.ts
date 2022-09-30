import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import Swal from 'sweetalert2';
import { device } from 'src/app/models/device';
import { ListDevicesComponent } from '../list-devices/list-devices.component';
import { DeviceService } from 'src/app/_services/device.service';
@Component({
  selector: 'app-update-devices',
  templateUrl: './update-devices.component.html',
  styleUrls: ['./update-devices.component.scss']
})
export class UpdateDevicesComponent implements OnInit,OnDestroy {
  deviceform!: FormGroup;
  deviceToUpdate : device ;
  subs = new SubscriptionContainer();
  constructor(public dialogRef: MatDialogRef<ListDevicesComponent>,
    private fb : FormBuilder,
    private service : DeviceService,
@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.deviceform = this.fb.group({
      characteristics:  ['', [Validators.required, Validators.minLength(3)]],
      newcondition:  ['',[Validators.required ]],
      goodcondition:  ['', [Validators.required ]],
      poorcondition:  ['', [Validators.required ]],
      faultycondition:  ['', [Validators.required ]],
    })
    this.subs.add = this.service.getDeviceById(this.data.deviceId).subscribe((res:device)=>{
      this.deviceToUpdate = res;
    })
  }
  ngOnDestroy() {
    this.subs.dispose();
  }

  updateDevice(){ 
    this.subs.dispose();
    this.subs.add =this.service.updateDevice(this.data.deviceId ,this.deviceform.value).subscribe((res:any) => {
      console.log("result update ", res);
        setTimeout(() => {
         Swal.fire(
           'Updated !',
           'The device is updated successfully !',
           'success'
         );
       }, 1500);
    });
}



}
