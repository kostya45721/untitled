import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import {ServiceBackend} from '../services/service.backend/service.backend';
import {UpdateUserService} from '../services/service.update.user/update.user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {
  maxdate: any;
  user: object;

  constructor( public backendService: ServiceBackend,
               private updateUserService: UpdateUserService) {
    this.maxdate = new Date().toISOString().substr(0, 10);
  }

  ngOnInit() {
  }

  createUser(form: NgForm) {
     this.user = {
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      phonenumber: form.value.phonenumber,
      dateOfBirth: form.value.dateOfBirth.toDateString(),
      dateOfAdded: new Date().toDateString(),
      dateOfChanged: new Date().toDateString()
    };
     this.backendService.createUser( this.user )
      .subscribe((user) => {
        this.updateUserService.updateUsers();
        return user;
      });
     form.resetForm();
  }
}
