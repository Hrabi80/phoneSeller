import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { user } from 'src/app/models/user';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit,OnDestroy {
  users : user[];
  subs = new SubscriptionContainer();
  constructor(private service : AuthService) { }
  
  ngOnInit(): void {
    this.subs.add = this.service.getUsers().subscribe((res:Array<user>)=>{
      this.users = res;
    });
  }
  ngOnDestroy(): void {
    this.subs.dispose();
  }

}
