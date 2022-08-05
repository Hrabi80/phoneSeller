import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { FormGroup ,FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  paymentOption = "";
  paypalForm: FormGroup;
  zelleForm : FormGroup;
  user :user;
  userPaypal: string;
  userZelle : string;
  constructor(private fb : FormBuilder,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit(): void {
    this.paypalForm = this.fb.group({
      paypal : [this.userPaypal,[Validators.email, Validators.required]],
      verify : [''],
    });
    this.zelleForm = this.fb.group({
      zelle : [[this.userZelle],[Validators.email, Validators.required]],
      verify : [''],
    });

    let id = localStorage.getItem('myuser_id');
    this.authService.getUserById(id).then((res:any)=>{
      this.userPaypal = res.data.paypal;
      this.userZelle = res.data.zelle;
    })
  }
  checkSimilarity() : boolean{ 
    let first = this.paypalForm.get('paypal').value;
    let second = this.paypalForm.get('verify').value;
    return first == second;
  }
  checkSimilarityZelle() : boolean{ 
    let first = this.paypalForm.get('zelle').value;
    let second = this.paypalForm.get('verify').value;
    return first == second;
  }

  selectOption(val:string) :void{
      this.paymentOption=val;
  }
  addPaypal() :void{
    if(this.paypalForm.invalid || !this.checkSimilarity()){
      Swal.fire(
        'Your verification adress is wrong!',
        'Please verify your paypal adress !',
        'error'
      );
    }else{
      var adress = this.paypalForm.get('verify').value ;
      localStorage.setItem('paymentOption','paypal');
      localStorage.setItem('adress',adress);
      this.router.navigate(['/cart/shipping-method']);
    }
  }
  addZelle() :void{
    if(this.zelleForm.invalid || !this.checkSimilarityZelle()){
      Swal.fire(
        'Your verification adress is wrong!',
        'Please verify your zelle adress !',
        'error'
      );
    }else{
      var adress = this.zelleForm.get('verify').value ;
      localStorage.setItem('paymentOption','zelle');
      localStorage.setItem('adress',adress);
      this.router.navigate(['/cart/shipping-method']);
    }
  }

  addCash() :void{
    localStorage.setItem('paymentOption','cash');
    localStorage.setItem('adress','---');
    this.router.navigate(['/cart/shipping-method']);
  }
  cancelOperation(): void {
    localStorage.removeItem('paymentOption');
    localStorage.removeItem('adress');
    this.router.navigate(['/cart']);
  }

}
