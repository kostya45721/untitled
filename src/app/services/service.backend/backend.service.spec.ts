import { TestBed } from '@angular/core/testing';

import { BackendService } from './backend.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

const newUser = {
  name: 'john',
  surname: 'Smith',
  email: 'someEmail@mail.com',
  phonenumber: '1234567890',
  dateOfBirth: new Date().toDateString(),
  dateOfAdded: new Date().toDateString(),
  dateOfChanged: new Date().toDateString()
};
const changeUser = {
  name: 'Andrew',
  surname: 'Jonson',
  email: 'someEmail2@mail.com',
  phonenumber: '0987654321',
  dateOfBirth: new Date().toDateString(),
  dateOfAdded: new Date().toDateString(),
  dateOfChanged: new Date().toDateString()
};

describe('BackendService', () => {
  let service: BackendService;
  let httpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackendService]
    });

    service = TestBed.get(BackendService);
    httpClient = TestBed.get(HttpTestingController);
  });

  it('should be created BackendService', () => {
    expect(service).toBeTruthy();
  });

  it('should send http request get', () => {
    service.getUsers().subscribe(

    );
    let req = httpClient.expectOne('http://host:3300/users', 'request GET');
    expect(req.request.method).toEqual('GET');
  });

  it('should sent http request post', () => {
    service.createUser(newUser).subscribe();
    let req = httpClient.expectOne('http://host:3300/user', 'request POST');
    expect(req.request.method).toEqual('POST');
  });

  it('should send http request put', () => {
    service.changeUser(+'XJYRWGkB6BhEGYp2k84_', changeUser ).subscribe();
    let req = httpClient.expectOne('http://host:3300/user/' + +'XJYRWGkB6BhEGYp2k84_', 'request PUT');
    expect(req.request.method).toEqual('PUT');
  });

  it('should send http request delete', () => {
    service.deleteUser(+'XJYRWGkB6BhEGYp2k84_' ).subscribe();
    let req = httpClient.expectOne('http://host:3300/user/' + +'XJYRWGkB6BhEGYp2k84_', 'request DELETE');
    expect(req.request.method).toEqual('DELETE');
  });
});
