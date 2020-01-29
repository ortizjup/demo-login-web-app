import { LocationService } from './../services/location.service';
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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancellRegister = new EventEmitter();

  userModel: IRegisterUser = <IRegisterUser>{};

  cities: ICity[];

  states: IState[];

  countries: ICountry[];

  constructor(private authService: AuthService
              ,private alertify: AlertifyService
              ,private router: Router
              ,private locationService: LocationService
              ,private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.locationService.getCities().subscribe((response: ICity[]) => {
      this.cities = response;
    }, error => {
      this.alertify.error('We could no load city list');
    });

    this.locationService.getCountries().subscribe((response: ICountry[]) => {
      this.countries = response;
    }, error => {
      this.alertify.error('We could no load country list');
    });

    this.locationService.getStates().subscribe((response: IState[]) => {
      this.states = response;
    }, error => {
      this.alertify.error('We could no load stae list');
    });
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
