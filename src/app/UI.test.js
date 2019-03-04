import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { UserService } from './user.service';

const userService = new UserService();
const userComponent = new UsersComponent(userService);
const userDetail = new UserDetailComponent(userService, userComponent);
const userCreate = new UserCreateComponent(userService, userComponent);

describe("UI tests", function () {
  it('should ', function () {

  });
});
