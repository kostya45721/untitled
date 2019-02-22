import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from './users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  deleteUser(id: number) {
    return this.http.delete('http://localhost:3300/delete_user/' + id, {responseType: 'text'});
  }

  addUser(user: User) {
    return this.http.post('http://localhost:3300/create', user, {responseType: 'text'});
  }

  getUsers() {
    // this.messageService.add('UserService: fetched users')
    return this.http.get('http://localhost:3300');
  }

  changeUser(oldId: number, newUser: User) {
    return this.http.post('http://localhost:3300/change_user/' + oldId, newUser, {responseType: 'text'});
  }
}
