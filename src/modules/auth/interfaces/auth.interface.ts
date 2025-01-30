import { User } from '../../users/entities/user.entity';
import { SignInDTO } from '../dto/signin.dto';

export interface IAuthService {
  signIn(signInDto: SignInDTO): Promise<{ accessToken: string; user: Omit<User, 'password'> }>;
  signOut(jwt: string, userId: User['id']): Promise<boolean>;
}
