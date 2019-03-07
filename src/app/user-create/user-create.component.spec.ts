import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, NgForm} from '@angular/forms';
import {DemoMaterialModule} from '../ngmaterial.module';
import { UserCreateComponent } from './user-create.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BackendService} from '../services/service.backend/backend.service';
import {of} from 'rxjs';
const sinon = require('sinon');


const form = <NgForm> {
  value: {
    name: 'john',
    surname: 'Smith',
    email: 'someEmail@mail.com',
    phonenumber: '1234567890',
    dateOfBirth: new Date(),
    dateOfAdded: new Date().toDateString(),
    dateOfChanged: new Date().toDateString()
  }
};
form.resetForm = () => true;
const newUser = {
  name: 'john',
  surname: 'Smith',
  email: 'someEmail@mail.com',
  phonenumber: '1234567890',
  dateOfBirth: new Date().toDateString(),
  dateOfAdded: new Date().toDateString(),
  dateOfChanged: new Date().toDateString()
};

const stubFunctionCreateUserbackendService = {
  createUser() { return of( true ); },
  getUsers() { return of( true ); }
};


describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreateComponent ],
      imports: [ FormsModule,
        DemoMaterialModule,
        HttpClientModule,
        BrowserAnimationsModule
        ],
      providers: [
        { provide: BackendService, useValue: stubFunctionCreateUserbackendService },
        { provide: NgForm, useValue: form }
        ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create UserCreateComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create user',  () => {
    let backendService = TestBed.get(BackendService);
    let stubFunctionCreateUser = sinon.spy(backendService, 'createUser')
    let stubFunctionGetUsers = sinon.spy(backendService, 'getUsers');
    let stubFunctionResetForm = sinon.spy(form, 'resetForm');

    expect(component.createUser(form));
    expect(component.user).toEqual(newUser);

    expect(stubFunctionCreateUser.called).toEqual(true);
    expect(stubFunctionCreateUser.callCount).toEqual(1);

    expect(stubFunctionGetUsers.called).toEqual(true);
    expect(stubFunctionGetUsers.callCount).toEqual(1);

    expect(stubFunctionResetForm.called).toEqual(true);
    expect(stubFunctionResetForm.callCount).toEqual(1);
  });
});
