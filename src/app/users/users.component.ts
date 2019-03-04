import { Component, OnInit } from '@angular/core';

import { User } from '../users';
import {UserService} from '../user.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements  OnInit {

  user: User;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: User, form: NgForm): void {
    form.resetForm();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe((users: any) => {
        let allUsers = [];
        for (let item of users) {
          allUsers.push( {
            id: item._id,
            name: item._source.name,
            surname: item._source.surname,
            email: item._source.email,
            phonenumber: item._source.phonenumber,
            dateOfBirth: item._source.dateOfBirth,
            dateOfAdded: item._source.dateOfAdded,
            dateOfChanged: item._source.dateOfChanged
          } );
        }
        this.users = allUsers;
        console.log(this.users);
      });
  }

  deleteUser(id: number, form: NgForm) {
    this.userService.deleteUser(id)
      .subscribe( () => {
       for (let item of this.users) {
         if (item.id === id) {
           this.getUsers();
           form.resetForm();
         }
       }
      });

    console.log(this.users);
  }
}

