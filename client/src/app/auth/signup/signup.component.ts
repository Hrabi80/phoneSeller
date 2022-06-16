import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import swal from 'sweetalert2'; 
@Component({
  selector: 'll-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;  
  message: string;  
  returnUrl: string;
  public error: string;
  
  constructor(private service : AuthService,
              private fb : FormBuilder,  
              private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({  
     // username: ['', Validators.required],  
      password: ['', Validators.required],
      username :['', [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]]
   });  
    this.returnUrl = '/dashboard';  
    //this.service.logout();
  }

  get f() { return this.signupForm.controls; } 
  signup() {   
    if (this.signupForm.invalid) {  
      swal.fire(
        'Something is wrong!',
        `Please verify your input`,
        'error'
      )
    }  
    else {  
      this.service.signup(this.signupForm.value).then(
        (res) => {
          console.log("add user res==>",res);
          setTimeout(() => {
           swal.fire(
             'Thank you !',
             'your are successfully registered to our platform',
             'success'
           );
         }, 3000);
       },
       (err)=>{
        swal.fire(
          'opss !',
          'your are successfully registered to our platform',
          'error'
        )}
       );
      }  
    }  

}
