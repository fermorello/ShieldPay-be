import { Request, Response } from 'express';
import { HttpResponse } from '../../../shared/response/http.response';
import { AuthService } from '../services/auth.service';
import { UserServiceImp } from '../../../shared/instances';

export class AuthController {
  constructor(
    private readonly authService: AuthService = new AuthService(UserServiceImp),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return this.httpResponse.NoContent(res);
    }
    try {
      const newUser = await this.authService.signIn(email, password);
      return this.httpResponse.Ok(res, newUser);
    } catch (e) {
      return this.httpResponse.Forbidden(res, e);
    }
  }
}
