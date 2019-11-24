import { AlertifyService } from './../../services/alertify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {

  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logging succed!');
      this.router.navigate(['/members']);
    }, error => {
      this.alertify.error('Error while loggin you: ' + error);
    });
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut(){
    if(this.loggedIn()){
      localStorage.removeItem('token');
      this.alertify.warning('You have been logged out of Dating App!');
      this.router.navigate(['/home']);
    }
  }

  editProfile(){
    console.log("Edit Profile");
  }

}
