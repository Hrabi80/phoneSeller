import { Component, OnInit } from '@angular/core';
import { contact } from 'src/app/models/contact';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { AdminService } from 'src/app/_services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'll-dashboard-saved-item',
  templateUrl: './dashboard-saved-item.component.html',
  styleUrls: ['./dashboard-saved-item.component.scss']
})
export class DashboardSavedItemComponent implements OnInit {
  view = 'list';
  subs = new SubscriptionContainer();
  contacts : Array<contact> = [] ; 
  constructor(private service : AdminService) {}

  ngOnInit(): void {
    this.subs.add = this.service.getAllContacts().subscribe((res:Array<contact>)=>{
      this.contacts = res;
    })
  }

  deleteContact(id:string){
    Swal.fire({
      title: 'Are you sure you want to delete this message ?',
      text: 'You will not able to read this content again',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor:'#049F0C',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((res) => {
      if (res.value) {
        this.service.deleteContact(id).subscribe(
          data => {
            Swal.fire(
              'Deleted!',
              'This message is deleted.',
              'success'
            );
            const index = this.contacts.findIndex(x => x._id === id);
              this.contacts.splice(index, 1);
          });
      }else{
        Swal.fire(
          'Canceled!',
          'This operation is canceled.',
          'success'
        )
      }
    });
  }
}
