import { Request, Response } from 'express';
import { BaseRouter } from '../../../config/base.router';
import { AuthController } from '../controllers/auth.controller';

const authController = new AuthController()

export default class AuthRouter extends BaseRouter<AuthController> {
  constructor() {
    super(authController);
  }
  routes(): void {
    this.router.post('/auth/login', (req: Request, res: Response): any =>
      this.controller.signIn(req, res)
    );
  }
}
