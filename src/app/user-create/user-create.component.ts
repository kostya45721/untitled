import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import {BackendService} from '../services/service.backend/backend.service';
import {UpdateUserService} from '../services/service.update.user/update.user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent {
  maxdate: any;
  user: object;
  userCreated: boolean;

  constructor( public backendService: BackendService,
               private updateUserService: UpdateUserService) {
    this.maxdate = new Date().toISOString().substr(0, 10);
    this.userCreated = false;
  }

  createUser(form: NgForm) {
    this.userCreated = true;
    setTimeout(() => {
      this.userCreated = false;
      }, 2000);
    this.user = {
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      phonenumber: form.value.phonenumber,
      dateOfBirth: form.value.dateOfBirth.toDateString(),
      dateOfAdded: new Date().toDateString(),
      dateOfChanged: new Date().toDateString()
    };
    this.backendService.createUser( this.user ).subscribe((user: any) => {
      this.updateUserService.updateUsers();
    });
    form.resetForm();
  }
}
