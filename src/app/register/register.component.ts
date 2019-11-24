import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser } from '../models/IUser';
import { isBuffer } from 'util';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { IRegisterUser } from '../models/Dtos/IRegisterUser';
import { ICity } from '../models/ICity';
import { IState } from '../models/IState';
import { ICountry } from '../models/ICountry';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancellRegister = new EventEmitter();

  userModel: IRegisterUser = <IRegisterUser>{};

  cities: ICity[] = [
    {id: 1, description: 'Cordoba'},
    {id: 2, description: 'Chicago'}
  ];

  states: IState[] = [
    {id: 1, description: 'Cordoba'},
    {id: 2, description: 'Omaha'}
  ];

  countries: ICountry[] = [
    {id: 1, description: 'Argentina'},
    {id: 2, description: 'Unitade States'}
  ];

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  cancell(){
    this.cancellRegister.emit(false);
  }

  register(){
    this.userModel.userName = this.userModel.email;
    this.authService.register(this.userModel).subscribe(() => {
      this.alertify.success('User Registration succed!');
      this.router.navigate(['/home']);
    }, error => {
      this.alertify.error('Register failed: ' + error);
    });
  }

}
