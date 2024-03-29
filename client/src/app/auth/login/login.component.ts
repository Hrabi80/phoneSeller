import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { FacebookService } from 'src/app/_services/facebook.service';
import swal from 'sweetalert2';
@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;  
  message: string;  
  returnUrlAdmin='';
  retunUrlUser='';
  isAdmin:boolean;
  constructor(private service : AuthService,
              private fb : FormBuilder,  
              private router : Router,
              private fbservice:FacebookService,
              ) { }

  ngOnInit(): void {

    this.signinForm = this.fb.group({  
      username: ['', Validators.required],  
      password: ['', Validators.required],
   });  
  }
  get f() { return this.signinForm.controls; }

  login(){
    var username = this.f.username.value.toLowerCase() 
    this.service.login(username, this.f.password.value)
    .pipe(first())
    .subscribe(
      (result) =>{
        console.log("myresult",result); 
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
          if(this.isAdmin == true){
           this.router.navigate(['/dashboard-naim-adminvv1']);
          }else{
            location.reload();
          }
        }, 2500);
      },
      err => err = 'Could not authenticate'
    )
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
