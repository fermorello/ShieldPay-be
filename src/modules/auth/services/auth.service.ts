import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ConfigServer } from '../../../config/config';
import { UserService } from '../../users/services/user.service';
import { User } from '../../users/entities/user.entity';
import { AppError } from '../../../shared/errors/app.errors';
import ICache from '../../../config/cache.interface';
import { IAuthService } from '../interfaces/auth.interface';
import { SignInDTO } from '../dto/signin.dto';

export class AuthService extends ConfigServer implements IAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly blacklistCache: ICache
  ) {
    super();
  }

  async signIn(
    body: SignInDTO
  ): Promise<{ accessToken: string; user: Omit<User, 'password'> }> {
    const { email, password } = body;

    const user: User | null = await this.validateUser(email, password);

    if (!user) {
      throw new AppError('Username or password are not correct.', 401);
    }

    const { password: userPassword, ...rest } = user;

    const payload = this.generateJWT(rest);

    return payload;
  }

  async signOut(jwt: string, userId: User['id']): Promise<boolean> {
    return this.blacklistCache.set(jwt, userId, 86400);
  }

  private generateJWT(user: Omit<User, 'password'>): {
    accessToken: string;
    user: Omit<User, 'password'>;
  } {
    return {
      accessToken: jwt.sign(
        { userId: user.id, email: user.email },
        this.getEnviorment('JWT_SECRET') as string,
        {
          expiresIn: '24h',
        }
      ),
      user,
    };
  }

  private async validateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    const userByEmail = await this.userService.findByEmail(email);
    if (userByEmail) {
      const isMatch = await bcrypt.compare(password, userByEmail.password);
      if (isMatch) return userByEmail;
    }
    return null;
  }
}
