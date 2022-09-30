import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../_services/auth.service';
import swal from 'sweetalert2'; 
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService:AuthService) { } 

      canActivate(){
        if (this.authService.loggedIn() && this.authService.isAdmin()) {
          return true;
        }
        
        swal.fire(
          'not autorized!',
          `Please signup first`,
          'error'
        )
        setTimeout(() => {
          this.router.navigate(['login']);
          return false;
        }, 3000);
        
      }
      }
  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.isLoggedIn()) {      
        return true;      
        }      
        // navigate to login page as user is not authenticated      
     this.router.navigate(['/login']);      
    return false;      
  }
  
  public isLoggedIn(): boolean {      
    let status = false;      
    if (localStorage.getItem('isLoggedIn') == "true") {      
       status = true;      
    }    
    else {      
       status = false;      
       }      
    return status;      
    }    */

