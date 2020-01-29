import { LocationService } from '../services/location.service';
import { ICity } from '../models/ICity';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class CityResolver implements Resolve<ICity[]>{

    constructor(private locationService: LocationService
        , private router: Router
        , private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ICity[]> {
        return this.locationService.getCities().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        )
    }
}