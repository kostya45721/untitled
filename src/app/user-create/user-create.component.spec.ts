import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, NgForm} from '@angular/forms';
import {DemoMaterialModule} from '../ngmaterial.module';
import { UserCreateComponent } from './user-create.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceBackend} from '../services/service.backend/service.backend';
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

const uiService = { createUser: () => true };


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
      providers: [{ provide: NgForm, useValue: form}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create user',  () => {
    let backendService = TestBed.get(ServiceBackend);
    let stubFunctionCreateUser = sinon.spy(backendService, 'createUser');
    let stubFunctionResetForm = sinon.spy(form, 'resetForm');
    expect(component.createUser(form));
    expect(component.user).toEqual(newUser);
    expect(stubFunctionCreateUser.called);
    expect(stubFunctionCreateUser.callCount).toEqual(1);
    expect(stubFunctionResetForm.called);
    expect(stubFunctionResetForm.callCount).toEqual(1);
  });
});
