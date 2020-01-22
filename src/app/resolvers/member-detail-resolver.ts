import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../services/alertify.service';
import { UserService } from './../services/user.service';
import { IUser } from './../models/IUser';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class MemberDetailResolver implements Resolve<IUser>{
    
    constructor(private userService: UserService
        , private router: Router
        , private alertify: AlertifyService) {}
    
    resolve(route: ActivatedRouteSnapshot): Observable<IUser>{
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        )
    }
}