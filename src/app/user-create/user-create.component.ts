import { Component, OnInit } from '@angular/core';

import { User } from '../users';
import { UserService } from '../user.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  users: User[];
  user: User;
  name: string;
  surname: string;
  email: string;

  constructor(private userService: UserService,
              private  userComponent: UsersComponent
              ) { }

  ngOnInit() {
  }

  createUser() {
    this.user = {
      id: new Date().getTime(),
      name: this.name,
      surname: this.surname,
      email: this.email
    };
    this.userService.addUser( this.user )
      .subscribe((user: any) => {
        this.user = user;
        this.userComponent.getUsers();
      }
      );
  }
}
