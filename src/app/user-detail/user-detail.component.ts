import { Component, OnInit, Input } from '@angular/core';
import { User } from '../users';
import { UserService } from '../user.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  newUser: User;
  name: string;
  surname: string;
  email: string;

  constructor(private userService: UserService,
              private  userComponent: UsersComponent) { }

  ngOnInit() {
  }

  changeUser() {
    this.newUser = {
      id: this.user.id,
      name: this.name,
      surname: this.surname,
      email: this.email
    };
    this.userService.changeUser( this.user.id, this.newUser)
      .subscribe((massage: any) => {
        this.userComponent.getUsers();
      });
  }
}
