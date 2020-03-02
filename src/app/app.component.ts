import { IUser } from './models/IUser';
import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  jwtHelper = new JwtHelperService();
  
  constructor(private authService: AuthService) {}

  ngOnInit(){
    const token = localStorage.getItem('token');
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    if(token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if(user){
      this.authService.currentUser = user;
    }
  }
}
