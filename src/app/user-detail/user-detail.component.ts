import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../users';
import { UserService } from '../user.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  newUser: User;
  maxdate: any;

  constructor(private userService: UserService,
              private  userComponent: UsersComponent) {
    this.maxdate = new Date().toISOString().substr(0, 10);
  }

  ngOnInit() {
  }

  changeUser(user: User, form: NgForm) {
    this.newUser = {
      id: user.id,
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      phonenumber: form.value.phonenumber,
      dateOfBirth: form.value.dateOfBirth.toDateString(),
      dateOfAdded: user.dateOfAdded,
      dateOfChanged: new Date().toDateString()
    };
    this.userService.changeUser( user.id, this.newUser)
      .subscribe(() => {
        this.userComponent.updateUsers();
        form.resetForm();
      });
    console.log(this.userComponent.users);
  }
}
