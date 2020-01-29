import { IUser } from '../../../models/IUser';
import { AlertifyService } from '../../../services/alertify.service';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.scss']
})
export class MemberListsComponent implements OnInit {

  users: IUser[];

  constructor(private userService: UserService
    , private route: ActivatedRoute
    , private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    })
  }
}
