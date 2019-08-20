import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { IUser } from '../models/IUser';
import { IRegisterUser } from '../models/Dtos/IRegisterUser';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

private baseUrl: string = environment.baseUrl + '/auth';

constructor(private http: HttpClient) { }

login(model: any){
  return this.http.post(this.baseUrl+'/login', model)
    .pipe(
        map((response: any) => {
            const user = response;
            if(user){
              localStorage.setItem('token', user.token);
            }
        })
      );
}

register(userForRegisterDto: IRegisterUser){
  return this.http.post(this.baseUrl + '/register', userForRegisterDto);
}

}
