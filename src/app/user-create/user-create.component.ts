import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  maxdate: any;

  constructor(private userService: UserService,
              private  userComponent: UsersComponent
              ) {
    this.maxdate = new Date().toISOString().substr(0, 10);
  }

  ngOnInit() {
  }

  createUser(form: NgForm) {
    this.user = {
      id: 1,
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      phonenumber: +form.value.phonenumber,
      dateOfBirth: form.value.dateOfBirth,
      dateOfAdded: new Date().toDateString(),
      dateOfChanged: new Date().toDateString()
    };
    this.userService.addUser( this.user )
      .subscribe(() => {
        this.userComponent.getUsers();
        form.reset();
      });
    console.log(this.userComponent.users);
  }
}
