import { ICountry } from '../models/ICountry';
import { LocationService } from '../services/location.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class CountryResolver implements Resolve<ICountry[]>{

    constructor(private locationService: LocationService
        , private router: Router
        , private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ICountry[]> {
        return this.locationService.getCountries().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        )
    }
}