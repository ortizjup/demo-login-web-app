import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser } from '../models/IUser';
import { isBuffer } from 'util';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { IRegisterUser } from '../models/Dtos/IRegisterUser';
import { ICity } from '../models/ICity';
import { IState } from '../models/IState';
import { ICountry } from '../models/ICountry';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  cancell(){
    this.cancellRegister.emit(false);
  }

  register(){
    console.log('Register method hitted!');
    
    this.userModel.userName = this.userModel.email;
    
    console.log(this.userModel);
    
    console.log('City' + this.userModel.city);
    
    console.log('State' + this.userModel.state);
    
    console.log('Country' + this.userModel.country);

    this.authService.register(this.userModel).subscribe(() => {
      Swal.fire({
        title: 'Register Succed!',
        text: 'Welcome dating app ' + this.userModel.userName + '!',
        type: 'success',
        timer: 4000
      });
    }, error => {
      console.log(error);
      Swal.fire({
        title: 'Register Failed!',
        text: error.message,
        type: 'error',
        showConfirmButton: false
      });
    });
  }

}
