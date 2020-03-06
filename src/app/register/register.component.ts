import { LocationService } from './../services/location.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser } from '../models/IUser';
import { isBuffer } from 'util';
import { AuthService } from '../services/auth.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { IRegisterUser } from '../models/Dtos/IRegisterUser';
import { ICity } from '../models/ICity';
import { IState } from '../models/IState';
import { ICountry } from '../models/ICountry';
import { AlertifyService } from '../services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancellRegister = new EventEmitter();
  registerForm: FormGroup; 
  userModel: IRegisterUser = <IRegisterUser>{};
  cities: ICity[];
  states: IState[];
  countries: ICountry[];
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService
              ,private alertify: AlertifyService
              ,private router: Router
              ,private locationService: LocationService
              ,private route: ActivatedRoute
              ,private formBuilder: FormBuilder) { }

  ngOnInit() {
   
    this.bsConfig = {
      containerClass: 'theme-dark-blue'
    }

    this.createRegisterForm(); 

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

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      gender: ['male'],
      userName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      knownAs: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      dateOfBirth: ['',[Validators.required]], 
      phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      adress: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      adress2: ['',],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zip: ['', [Validators.required]], 
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]
    }, {validator: this.passwordMatchValidator});
  }
  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  cancell(){
    this.cancellRegister.emit(false);
    
  }

  register(){
    console.log(this.registerForm);
    if(this.registerForm.valid){
      this.userModel = Object.assign({}, this.registerForm.value);
      //easy fix = do not do this on practice just saving time
      this.userModel.email = this.registerForm.get('username').value;
      console.log(this.userModel);
      this.authService.register(this.userModel).subscribe(() => {
      this.alertify.success('User Registration succed!');
       this.router.navigate(['/home']);
      }, error => {
       this.alertify.error('Register failed: ' + error);
      }, () => {
        this.authService.login(this.userModel).subscribe(() => {
          this.router.navigate['/members'];
        });
      });
    }
  }

}
