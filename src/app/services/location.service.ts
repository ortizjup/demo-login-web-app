import { IState } from './../models/IState';
import { ICountry } from './../models/ICountry';
import { ICity } from './../models/ICity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCities(): Observable<ICity[]>{
    return this.http.get<ICity[]>(this.baseUrl + 'location/cities'); 
  }
  
  getCountries(): Observable<ICountry[]>{
    return this.http.get<ICountry[]>(this.baseUrl + 'location/countries');
  }

  getStates(): Observable<IState[]>{
    return this.http.get<IState[]>(this.baseUrl + 'location/states');
  }
}
