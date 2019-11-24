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

  constructor(public authService: AuthService) { }

  ngOnInit() {

  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      Swal.fire({
        title: 'Login Succed!',
        text: 'Welcome!',
        type: 'success',
        timer: 4000
      });
    }, error => {
      Swal.fire({
        title: 'Login Failed!',
        text: error,
        type: 'error',
        showConfirmButton: false
      });
    });
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logOut(){
    if(this.loggedIn()){
      localStorage.removeItem('token');
      Swal.fire({
        title: 'Logged Out',
        text: 'You have been logged out of Dating App',
        type: 'success',
        showConfirmButton: false,
        timer: 3000
      });
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
