import { IUser } from './../models/IUser';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const httpOptions = {
 headers: new HttpHeaders({
  'Authorization': 'Bearer ' + localStorage.getItem('token')
 })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

constructor(private http: HttpClient) { }

getUsers(): Observable<IUser[]>{
  return this.http.get<IUser[]>(this.baseUrl + 'users', httpOptions); 
}

getUser(id: any): Observable<IUser>{
  return this.http.get<IUser>(this.baseUrl + 'users/' + id, httpOptions);
}



}
