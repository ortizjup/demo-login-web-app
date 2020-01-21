import { IUser } from './../models/IUser';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

constructor(private http: HttpClient) { }

getUsers(): Observable<IUser[]>{
  return this.http.get<IUser[]>(this.baseUrl + 'users'); 
}

getUser(id: any): Observable<IUser>{
  return this.http.get<IUser>(this.baseUrl + 'users/' + id);
}
}
