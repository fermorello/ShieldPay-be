import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { HttpResponse } from '../../../shared/response/http.response';

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return this.httpResponse.NoContent(res);
    }
    try {
      const newUser = await this.userService.create({ email, password });
      return this.httpResponse.Ok(res, newUser);
    } catch (e) {
      return this.httpResponse.Forbidden(res, e);
    }
  }
}
