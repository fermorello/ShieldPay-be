import { Request, Response } from 'express';
import { BaseRouter } from '../../../config/base.router';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../../../shared/instances';

const authController = new AuthController();

export default class AuthRouter extends BaseRouter<AuthController> {
  constructor() {
    super(authController);
  }
  routes(): void {
    this.router.post('/auth/login', (req: Request, res: Response): any =>
      this.controller.signIn(req, res)
    );
    this.router.post(
      '/auth/logout',
      [authMiddleware.authenticate as any],
      (req: Request, res: Response): any => this.controller.signOut(req, res)
    );
  }
}
