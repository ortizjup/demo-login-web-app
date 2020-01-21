import { IUser } from '../../../models/IUser';
import { AlertifyService } from '../../../services/alertify.service';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.scss']
})
export class MemberListsComponent implements OnInit {

  users: IUser[];

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers().subscribe((response: IUser[]) => {
      this.users = response;
        response.forEach(user => {
      });
      }, error => {
        this.alertify.error(error);
      });
  }
}
