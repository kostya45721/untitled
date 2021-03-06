import { Injectable } from '@angular/core';
import {BackendService} from '../service.backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
  users: object[];

  constructor(private backendService: BackendService) { }

  updateUsers() {
    this.backendService.getUsers()
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
}
