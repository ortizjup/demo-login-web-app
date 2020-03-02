import { IUpdateUserDto } from './../../../models/Dtos/IUpdateUserDto';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from './../../../services/alertify.service';
import { LocationService } from './../../../services/location.service';
import { IState } from './../../../models/IState';
import { ICountry } from './../../../models/ICountry';
import { ICity } from './../../../models/ICity';
import { ActivatedRoute } from '@angular/router';
import { IUser } from './../../../models/IUser';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-member-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window: beforeunload', ['$event'])
  unloadNotification($event: any) {
    console.log($event);
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  user: IUser;
  cities: ICity[];
  countries: ICountry[];
  states: IState[];
  changeDetected: boolean = false;
  updateUserDto = {} as IUpdateUserDto;

  constructor(private route: ActivatedRoute
    , private locationService: LocationService
    , private alertify: AlertifyService
    , private userService: UserService
    , private authService: AuthService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user']
    });

    this.route.data.subscribe(data => {
      this.cities = data['cities']
    });

    this.route.data.subscribe(data => {
      this.countries = data['countries']
    });

    this.route.data.subscribe(data => {
      this.states = data['states']
    });
  }

  loadInitialData() {
    this.locationService.getCities().subscribe((response: ICity[]) => {
      this.cities = response;
      console.log(response);
    }, error => {
      this.alertify.error(error);
    });

    this.locationService.getCountries().subscribe((response: ICountry[]) => {
      this.countries = response;
    }, error => {
      this.alertify.error(error);
    });

    this.locationService.getStates().subscribe((response: IState[]) => {
      this.states = response;
    }, error => {
      this.alertify.error(error);
    });
  }

  updateUser() {
    console.log(this.user);
    console.log(this.updateUserDto);

    //Disclaimer
    //this.authService.decodedToken.nameid; we can get the id from the token i
    //am not following that path since i already have the id in the user form but is posible
    //this.updateUserDto.id = this.authService.decodedToken.nameid;
    this.updateUserDto.id = this.user.id;
    this.updateUserDto.City = this.user.city;
    this.updateUserDto.State = this.user.state;
    this.updateUserDto.Country = this.user.country;
    this.updateUserDto.interests = this.user.interests;
    this.updateUserDto.introduction = this.user.introduction;
    this.updateUserDto.lookingFor = this.user.introduction;

    this.userService.updateUser(this.updateUserDto).subscribe((response: any) => {
      this.alertify.success("Profile Updated Succesfully!");
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }

  updateMainPhoto(photoUrl: string){
    this.user.photoUrl = photoUrl;
  }

}
