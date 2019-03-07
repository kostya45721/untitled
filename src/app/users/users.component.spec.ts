import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, NgForm} from '@angular/forms';
import {DemoMaterialModule} from '../ngmaterial.module';
import {BackendService} from '../services/service.backend/backend.service';
import {of} from 'rxjs';
import {UpdateUserService} from '../services/service.update.user/update.user.service';
const sinon = require('sinon');

const form = {
  value: {
    name: 'Andrew',
    surname: 'Jonson',
    email: 'someEmail2@mail.com',
    phonenumber: '0987654321',
    dateOfBirth: new Date(),
    dateOfAdded: new Date().toDateString(),
    dateOfChanged: new Date().toDateString()
  }
} as NgForm;
form.resetForm = () => true;

const changeUser = {
  id: '19IRVGkBL_4_2jfQ9F7R',
  name: 'Andrew',
  surname: 'Jonson',
  email: 'someEmail2@mail.com',
  phonenumber: '0987654321',
  dateOfBirth: new Date().toDateString(),
  dateOfAdded: new Date().toDateString(),
  dateOfChanged: new Date().toDateString()
};

const stubFunctionResetForm = sinon.spy(form, 'resetForm');
const stubFunctionCreateUserbackendService = {
  deleteUser() { return of( true ); },
  changeUser() { return of( true ); },
  getUsers() { return of( true ); }
};

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let backendService: BackendService;
  let updateUserService: UpdateUserService;
  let stubFunctionGetUsers: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [ HttpClientModule,
        FormsModule,
        DemoMaterialModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: BackendService, useValue: stubFunctionCreateUserbackendService },
        { provide: NgForm, useValue: form }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backendService = TestBed.get(BackendService);
    updateUserService = TestBed.get(UpdateUserService);
    stubFunctionGetUsers = sinon.spy(backendService, 'getUsers');
  });

  it('should create UsersComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call function ngOnInit', () => {
    const stubFunctionUpdateUsers = sinon.spy(updateUserService, 'updateUsers');
    expect(component.ngOnInit());
    expect(stubFunctionUpdateUsers.called).toEqual(true);
    expect(stubFunctionUpdateUsers.callCount).toEqual(1);
  });

  it('should change user', () => {
    const stubFunctionChangeUser = sinon.spy(backendService, 'changeUser');

    expect(component.changeUser(changeUser , form));
    expect(component.user).toEqual(changeUser);

    expect(stubFunctionChangeUser.called).toEqual(true);
    expect(stubFunctionChangeUser.callCount).toEqual(1);

    expect(stubFunctionGetUsers.called).toEqual(true);
    expect(stubFunctionGetUsers.callCount).toEqual(1);

    expect(stubFunctionResetForm.called).toEqual(true);
    expect(stubFunctionResetForm.callCount).toEqual(1);
  });

  it('should delete user', () => {
    const stubFunctionDeleteUser = sinon.spy(backendService, 'deleteUser');

    expect(component.deleteUser(+changeUser.id));

    expect(stubFunctionDeleteUser.called).toEqual(true);
    expect(stubFunctionDeleteUser.callCount).toEqual(1);

    expect(stubFunctionGetUsers.called).toEqual(true);
    expect(stubFunctionGetUsers.callCount).toEqual(1);
  });

  it('should called function onSelect', () => {
    expect(component.onSelect(form));
    expect(stubFunctionResetForm.called).toEqual(true);
    expect(stubFunctionResetForm.callCount).toEqual(2);
  });
});
