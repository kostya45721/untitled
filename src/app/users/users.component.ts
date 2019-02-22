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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe((users: any) => {
        this.users = users;
        console.log(this.users);
      });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe( (newUsersArray: any) => {
        this.getUsers();
      });
  }
}

