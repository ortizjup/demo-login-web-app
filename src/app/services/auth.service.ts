import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { IUser } from '../models/IUser';
import { IRegisterUser } from '../models/Dtos/IRegisterUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl: string = environment.baseUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: IUser;
  photoUrl = new BehaviorSubject<string>('../../../assets/logos/userdefaultimg.png');
  currenPhotoUrl = this.photoUrl.asObservable();
  photoUrl2: string = '../../../assets/logos/userdefaultimg.png';

  constructor(private http: HttpClient) { }

  changeMemberPhoto(photoUrl: string){
    this.photoUrl.next(photoUrl);
    this.photoUrl2 = photoUrl;
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login/', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user.user;
            this.changeMemberPhoto(this.currentUser.photoUrl);
          }
        })
      );
  }

  register(userForRegisterDto: IRegisterUser) {
    return this.http.post(this.baseUrl + 'register/', userForRegisterDto);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
  }
}
