import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { menuList as staticMenuList } from '../../data/menus';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';

import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'll-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() topFixed: boolean;
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean;
  menuList = [];
  isLessThenLargeDevice;
  baseURL = environment.frontURL+'/';
  currentURL : string;
  ishome : boolean = true;
  isLoggedIn : boolean = false;
  element = document.querySelector('.ll_header');
  constructor(
           private router : Router,
           private authService : AuthService,
           private breakpointObserver: BreakpointObserver,
           public dialog: MatDialog) {
            router.events.subscribe((val) => {
              this.currentURL = window.location.href;
              this.ishome = (this.currentURL == this.baseURL);
              if(!this.ishome)
                this.element!.classList.add('navbar-inverse');
           });
           }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.loggedIn();
    this.element = document.querySelector('.ll_header');
   // this.ishome = (this.currentURL == this.baseURL);
   
    this.menuList = staticMenuList;
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
  }


  checkScroll() {
    this.isScrolled = window.pageYOffset > 15;
  }
  @HostListener('window:scroll', ['$event'])
  @HostListener('document:mousewheel', ['$event'])
  @HostListener('document:keydown', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onDocumentMousewheelEvent(event:any) {
    if(this.ishome){
    if (document.body.scrollTop > 480 || document.documentElement.scrollTop > 480) {
      this.element.classList.add('navbar-inverse');
    } else {
      this.element.classList.remove('navbar-inverse');
    }
  }else{
    this.element.classList.add('navbar-inverse');
  }
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
    location.reload();
  }
}


