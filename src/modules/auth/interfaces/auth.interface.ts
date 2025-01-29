import { User } from '../../users/entities/user.entity';

export interface IAuthService {
  register(registerDto: RegisterDTO): Promise<{ user: User; token: string }>;
  signIn(signInDto: SignInDTO): Promise<{ user: User; token: string }>;
  signOut(userId: User['id']): Promise<boolean>;
}
