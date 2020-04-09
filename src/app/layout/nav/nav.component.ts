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
  photoUrl: string; 

  constructor(private authService: AuthService,
              private alertify: AlertifyService, 
              private router: Router) { 
              }

  ngOnInit() {
   //this.authService.currenPhotoUrl.subscribe(photoUrl => this.photoUrl == photoUrl);
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
    return this.authService.loggedIn();
  }

  logOut(){
    if(this.loggedIn()){
      this.authService.logOut();
      this.alertify.warning('You have been logged out of Dating App!');
      this.router.navigate(['/home']);
    }
  }

  editProfile(){
    console.log("Edit Profile");
  }

  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

}
