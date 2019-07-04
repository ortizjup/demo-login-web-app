import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isVisible: Boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  ngOnSingUpClick(show: Boolean){
    if(this.isVisible !== show){
      this.isVisible = true;
    }else{
      this.isVisible = false;
    }
  }

}
