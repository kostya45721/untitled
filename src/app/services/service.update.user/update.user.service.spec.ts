import { TestBed } from '@angular/core/testing';

import { UpdateUserService } from './update.user.service';
import {HttpClientModule} from '@angular/common/http';
import {BackendService} from '../service.backend/backend.service';
import {of} from 'rxjs';
const sinon = require('sinon');

const stubFunctionCreateUserbackendService = {
  getUsers() { return of( users ); }
};

const users = [
  { _id: '19IRVGkBL_4_2jfQ9F7R',
    _source: {
      name: 'Andrew',
      surname: 'Jonson',
      email: 'someEmail2@mail.com',
      phonenumber: '0987654321',
      dateOfBirth: new Date().toDateString(),
      dateOfAdded: new Date().toDateString(),
      dateOfChanged: new Date().toDateString() }
  },
  {
    _id: '19IRVGkBL_4_3jfQ9F7R',
    _source: {
      name: 'Andrew',
      surname: 'Jonson',
      email: 'someEmail2@mail.com',
      phonenumber: '0987654321',
      dateOfBirth: new Date(),
      dateOfAdded: new Date().toDateString(),
      dateOfChanged: new Date().toDateString()
    }
  }
]

describe('UpdateUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
    providers: [{ provide: BackendService, useValue: stubFunctionCreateUserbackendService }]
  }));

  it('should be created UpdateUserService', () => {
    const service: UpdateUserService = TestBed.get(UpdateUserService);
    expect(service).toBeTruthy();
  });

  it('should update users array', () => {
    const service: UpdateUserService = TestBed.get(UpdateUserService);
    const backendService = TestBed.get(BackendService);
    const stubFunctionGetUsers = sinon.spy(backendService, 'getUsers');
    expect(service.updateUsers());

    expect(stubFunctionGetUsers.called).toEqual(true);
    expect(stubFunctionGetUsers.callCount).toEqual(1);

    expect(service.users.length).toEqual(2);
  });
});
