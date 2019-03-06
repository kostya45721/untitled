import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceBackend {

  constructor( private http: HttpClient) { }

  deleteUser(id: number) {
    return this.http.delete('http://localhost:3300/user/' + id, {responseType: 'text'});
  }

  createUser(user: object) {
    return this.http.post('http://localhost:3300/user', user, {responseType: 'text'});
  }

  getUsers() {
    return this.http.get('http://localhost:3300/users');
  }

  changeUser(oldId: number, newUser: object) {
    return this.http.put('http://localhost:3300/user/' + oldId, newUser, {responseType: 'text'});
  }
}
