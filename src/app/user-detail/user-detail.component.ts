import { Component, OnInit, Input } from '@angular/core';
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
  @Input() user: User;
  newUser: User;
  maxdate: any;

  constructor(private userService: UserService,
              private  userComponent: UsersComponent) {
    this.maxdate = new Date().toISOString().substr(0, 10);
  }

  ngOnInit() {
  }

  changeUser(form: NgForm) {
    this.newUser = {
      id: this.user.id,
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      phonenumber: +form.value.phonenumber,
      dateOfBirth: String(form.value.dateOfBirth),
      dateOfAdded: this.user.dateOfAdded,
      dateOfChanged: new Date().toDateString()
    };


    this.userService.changeUser( this.user.id, this.newUser)
      .subscribe(() => {
        this.userComponent.getUsers();
        form.reset();
      });

    console.log(this.userComponent.users);
  }
}
