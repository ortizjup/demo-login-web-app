import { map } from 'rxjs/operators';
import { PaginatedResult } from './../models/IPagination';
import { IPhoto } from './../models/IPhoto';
import { IUpdateUserDto } from './../models/Dtos/IUpdateUserDto';
import { IUser } from './../models/IUser';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerParge?, userParams?): Observable<PaginatedResult<IUser[]>> {
    const paginatedResult: PaginatedResult<IUser[]> = new PaginatedResult<IUser[]>();

    let params = new HttpParams();

    if(page != null && itemsPerParge != null){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerParge);
    }

    if(userParams != null){
      params = params.append("minAge", userParams.minAge);
      params = params.append("maxAge", userParams.maxAge);
      params = params.append("gender", userParams.gender);
      params = params.append("orderBy", userParams.orderBy);
    }

    return this.http.get<IUser[]>(this.baseUrl + 'users', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if(response.headers.get('Pagination') != null){
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
            console.log(paginatedResult);
          }
          return paginatedResult;
        })
      );
  }

  getUser(id: any): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + 'users/' + id);
  }

  updateUser(userDto: IUpdateUserDto) {
    return this.http.post(this.baseUrl + 'users/', userDto);
  }

  setMainPhoto(userId: number, id: number){
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, photoId: number){
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + photoId, {})
  }
}
