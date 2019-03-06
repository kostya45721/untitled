import {Component, OnInit} from '@angular/core';

import {NgForm} from '@angular/forms';
import {ServiceBackend} from '../services/service.backend/service.backend';
import {UpdateUserService} from '../services/service.update.user/update.user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements  OnInit {
  maxdate: any;
  user: object;

  constructor( private backendService: ServiceBackend,
               private updateUserService: UpdateUserService) {
    this.maxdate = new Date().toISOString().substr(0, 10);
  }

  ngOnInit() {
    this.updateUserService.updateUsers();
  }

  changeUser(user: any, form: NgForm) {
    this.user = {
      id: user.id,
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      phonenumber: form.value.phonenumber,
      dateOfBirth: form.value.dateOfBirth.toDateString(),
      dateOfAdded: user.dateOfAdded,
      dateOfChanged: new Date().toDateString()
    };
    this.backendService.changeUser( user.id, this.user)
      .subscribe(() => {
        this.updateUserService.updateUsers();
      });
    form.resetForm();
  }

  deleteUser(id: number, form: NgForm) {
    this.backendService.deleteUser(id)
      .subscribe( () => {
        this.updateUserService.updateUsers();
      });
    form.resetForm();
  }

  onSelect(form: NgForm): void {
    form.resetForm();
  }
}

