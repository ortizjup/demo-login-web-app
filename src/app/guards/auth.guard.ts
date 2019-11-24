import { AlertifyService } from './../services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router, private alertfy: AlertifyService){
  }

  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    }

    this.alertfy.error('For accesing this function please log in!');
    this.router.navigate(['/home']);
    return false;
  }
}

