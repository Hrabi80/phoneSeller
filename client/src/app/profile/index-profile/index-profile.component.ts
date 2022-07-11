import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { user } from 'src/app/models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { ShippingInfoComponent } from '../shipping-info/shipping-info.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-index-profile',
  templateUrl: './index-profile.component.html',
  styleUrls: ['./index-profile.component.scss']
})
export class IndexProfileComponent implements OnInit {

  user : user;
  constructor(private authService : AuthService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    let id = localStorage.getItem('myuser_id');
    this.authService.getUserById(id).then((res:any)=>{
      this.user = res.data;
    })
  }

  openPrimaryInfo() {
    const dialogRef = this.dialog.open(UserInfoComponent , {data:{user:this.user}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openShipping() {
    const dialogRef2 = this.dialog.open(ShippingInfoComponent , {data:{user:this.user}});
    dialogRef2.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
