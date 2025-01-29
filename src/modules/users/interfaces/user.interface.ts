import IRepository from '../../../config/repository.interface';
import { CreateUserDTO } from '../dto/createUser.dto';
import { User } from '../entities/user.entity';

export interface IUser {
  id: number;
  email: string;
  password: string;
}

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}

export interface IUserService {
  find(query?: { [key: string]: unknown }):
    | Promise<User[] | null>;
  findOne(id: User['id']): Promise<User | null>;
  create(entity: CreateUserDTO): Promise<Omit<User, 'password'> | null>;
  update(id: User['id'], entity: User | Partial<User>): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
