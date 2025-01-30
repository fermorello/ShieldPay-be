import { Request, Response } from 'express';
import { HttpResponse } from '../../../shared/response/http.response';
import { AuthService } from '../services/auth.service';
import { nodeCacheImp, UserServiceImp } from '../../../shared/instances';

export class AuthController {
  constructor(
    private readonly authService: AuthService = new AuthService(
      UserServiceImp,
      nodeCacheImp
    ),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return this.httpResponse.NoContent(res);
    }
    try {
      const newUser = await this.authService.signIn({ email, password });
      return this.httpResponse.Ok(res, newUser);
    } catch (e) {
      return this.httpResponse.Forbidden(res, e);
    }
  }

  async signOut(req: Request, res: Response) {
    const token = req.headers['authorization']?.split(' ')[1];
    const user = req.user;
    try {
      const signOut = await this.authService.signOut(token!, user);

      if (!signOut) {
        return this.httpResponse.ERROR(res, 'Could not logged out.');
      }

      return this.httpResponse.Ok(res, 'Logged out successfully');
    } catch (e) {
      return this.httpResponse.Forbidden(res, e);
    }
  }
}
