import { Component, OnInit } from '@angular/core';

import { User } from '../users';
import {UserService} from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements  OnInit {

  user: User;
  users: User[];
  selectedUser: User;
  selectedFlag: boolean;

  constructor(private userService: UserService) { this.selectedFlag = false; }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: User): void {
    if (!this.selectedFlag) {
      this.selectedUser = user;
      this.selectedFlag = !this.selectedFlag;
    }
    else if (this.selectedUser !== user) { this.selectedUser = user; }
    else { this.selectedUser = null; }
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe((users: any) => {
        const allUsers = [];
        for (let i = 0; i < users.length; i++) {
          allUsers.push( {
            id: users[i]._id,
            name: users[i]._source.name,
            surname: users[i]._source.surname,
            email: users[i]._source.email,
            phonenumber: users[i]._source.phonenumber,
            dateOfBirth: users[i]._source.dateOfChanged,
            dateOfAdded: users[i]._source.dateOfAdded,
            dateOfChanged: users[i]._source.dateOfChanged
          } );
        }
        this.users = allUsers;
        console.log(this.users);
      });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe( () => {
       for (let i = 0; i < this.users.length; i++) {
         if (this.users[i].id === id) {
           this.getUsers();
           this.selectedUser = null;
         }
       }
      });

    console.log(this.users);
  }
}

