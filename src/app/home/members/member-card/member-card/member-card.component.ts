import { IUser } from './../../../../models/IUser';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  @Input() user: IUser;
  
  constructor() { }

  ngOnInit() {
  }

}
