import { Request, Response } from 'express';
import { BaseRouter } from '../../../config/base.router';
import { UserController } from '../controllers/user.controller';
import { UserServiceImp } from '../../../shared/instances';

const UserControllerImp = new UserController(UserServiceImp);

export default class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserControllerImp);
  }
  routes(): void {
    this.router.post('/users/register', (req: Request, res: Response): any =>
      this.controller.register(req, res)
    );
  }
}
