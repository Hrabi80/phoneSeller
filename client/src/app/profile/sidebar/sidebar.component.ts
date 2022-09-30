import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isLessThenLargeDevice;
  
  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private AuthService: AuthService) {}
  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
     
      
    });


  }
  onLogout(): void {
    this.AuthService.logout();
    this.router.navigate(['/']);
  }

}
