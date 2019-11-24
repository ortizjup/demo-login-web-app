import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/IUser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerMode: Boolean;

  constructor() { }

  ngOnInit() {
  }

  showRegisterForm(show: boolean){
    this.registerMode = show;
  }
}
