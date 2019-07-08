import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/IUser';
import { isBuffer } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userModel: IUser = <IUser>{};
  
  constructor() { }

  ngOnInit() {
  }

  register(){
    console.log("Method Hitted");
    console.log(this.userModel);
  }

  cancell(){
    
  }

}
