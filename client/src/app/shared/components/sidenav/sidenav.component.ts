import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { menuList } from '../../data/menus';
import { MatDialog } from '@angular/material/dialog';
import { TrackOrderComponent } from 'src/app/track-order/track-order.component';
import { AuthService } from 'src/app/_services/auth.service';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'll-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  navList = [];
  isLoggedIn : boolean = false;
  //Admin
  isAdmin = false;
  constructor(public dialog: MatDialog,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.navList = menuList;
    this.isLoggedIn = this.authService.loggedIn();
    this.isAdmin = this.authService.isAdmin();
  }
  openTrackOrder(){
    const dialogRef = this.dialog.open(TrackOrderComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openSignup() {
    const dialogRef = this.dialog.open(SignupComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openLogin(){
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout(){
    this.authService.logout();
    //this.cartItems = undefined;
    location.reload();
  }

}
