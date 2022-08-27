import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { FacebookService } from 'src/app/_services/facebook.service';
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
  isAdmin:boolean;
  
  constructor(private service : AuthService,
              private fbservice : FacebookService,
              private fb : FormBuilder,  
              private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({  
     // username: ['', Validators.required],  
      password: ['', Validators.required],
      username :['', [Validators.required,
        Validators.pattern("^[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,4}$")
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
    
    
    fbLogin() {
      this.fbservice.fbLogin().then((res:any) => {
        console.log('User has been logged in', res);
        let mm=localStorage.getItem('access_token');
        let jwtData = mm!.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        let id = decodedJwtData._id;
        localStorage.setItem('myuser_id', id); 
        this.service.getUserById(id).then((res:any)=>{
           this.isAdmin= res.data.admin;
           localStorage.setItem('cart', res.data.cart);
           localStorage.setItem('isAdmin',JSON.stringify(this.isAdmin));       
          swal.fire(
            `welcome`,
            'You logged in successfully !',
            'success'
          )
        })
        setTimeout(() => {
            location.reload();
        }, 2500);
      });  
    }

}
