import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { SubscriptionContainer } from '../_helper/subscription-container';
import { ClientService } from '../_services/client.service';
@Component({
  selector: 'll-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit,OnDestroy {
  contactForm : FormGroup;
  subs = new SubscriptionContainer();
  constructor(private fb : FormBuilder,
              private service : ClientService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name:  [''],
      email:  ['', [Validators.required,Validators.email ]],
      phone : ['',],
      message:  ['']
    })
  }
  ngOnDestroy() {
    this.subs.dispose();
  }

  addContact(){
    this.subs.add = this.service.addContact(this.contactForm.value).subscribe((res)=>{
      setTimeout(() => {
        swal.fire(
          'Thank you !',
          'We received your message, we will contact you soon !',
          'success'
        );
        this.contactForm.reset();
      }, 100);
    })
  }

}
