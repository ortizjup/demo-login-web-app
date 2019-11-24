import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { IUser } from '../models/IUser';
import { IRegisterUser } from '../models/Dtos/IRegisterUser';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

private baseUrl: string = environment.baseUrl + '/auth';
jwtHelper = new JwtHelperService();
decodedToken: any;

constructor(private http: HttpClient) { }

login(model: any){
  return this.http.post(this.baseUrl+'/login', model)
    .pipe(
        map((response: any) => {
            const user = response;
            if(user){
              localStorage.setItem('token', user.token);
              this.decodedToken = this.jwtHelper.decodeToken(user.token);
            }
        })
      );
}

register(userForRegisterDto: IRegisterUser){
  return this.http.post(this.baseUrl + '/register', userForRegisterDto);
}

loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

logOut(){
  localStorage.removeItem('token');
}
}
