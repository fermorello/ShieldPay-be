import jwt from 'jsonwebtoken';
import ICache from '../../config/cache.interface';
import { ConfigServer } from '../../config/config';
import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../response/http.response';
import { User } from '../../modules/users/entities/user.entity';

export class AuthMiddleware extends ConfigServer {
  constructor(
    private blacklistCache: ICache,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {
    super();
    this.authenticate = this.authenticate.bind(this);
  }

  async authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).send('No token provided');
    }

    try {
      const blacklisted = await this.blacklistCache.has(token);

      if (blacklisted) {
        return this.httpResponse.Unauthorized(res, 'Token is invalidated.');
      }

      jwt.verify(
        token,
        this.getEnviorment('JWT_SECRET') as string,
        (err, decoded) => {
          if (err) {
            return this.httpResponse.Unauthorized(res, err.message);
          }

          req.user = decoded as User;
          next();
        }
      );
    } catch (error) {
      console.error('Error checking blacklist:', error);
      return res.status(500).send('Error checking blacklist');
    }
  }
}
