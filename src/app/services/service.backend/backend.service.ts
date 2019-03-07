import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  express = {
    localhost: 'localhost',
    port: '3300'
  };


  constructor( private http: HttpClient ) { }

  deleteUser(id: number) {
    return this.http.delete('http://' + this.express.localhost + ':' + this.express.port + '/user/' + id, {responseType: 'text'});
  }

  createUser(user: object) {
    return this.http.post('http://' + this.express.localhost + ':' + this.express.port + '/user', user, {responseType: 'text'});
  }

  getUsers() {
    return this.http.get('http://' + this.express.localhost + ':' + this.express.port + '/users');
  }

  changeUser(oldId: number, newUser: object) {
    return this.http.put('http://' + this.express.localhost + ':' + this.express.port + '/user/' + oldId, newUser, {responseType: 'text'});
  }
}
