import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  express = {
    host: environment.backendHost
  };

  constructor( private http: HttpClient ) { }

  deleteUser(id: number) {
    return this.http.delete(this.express.host + '/user/' + id, {responseType: 'text'});
  }

  createUser(user: object) {
    return this.http.post(this.express.host + '/user', user, {responseType: 'text'});
  }

  getUsers() {
    return this.http.get(this.express.host + '/users');
  }

  changeUser(oldId: number, newUser: object) {
    return this.http.put(this.express.host + '/user/' + oldId, newUser, {responseType: 'text'});
  }
}
