import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { BaseService } from '../../../config/base.service';
import IRepository from '../../../config/repository.interface';
import { User } from '../entities/user.entity';
import { IUserRepository, IUserService } from '../interfaces/user.interface';
import { AppError, ValidationError } from '../../../shared/errors/app.errors';
import { CreateUserDTO } from '../dto/createUser.dto';

export class UserService
  extends BaseService<User, IUserRepository>
  implements IUserService
{
  constructor(repository: IUserRepository) {
    super(repository);
  }

  find(query?: { [key: string]: unknown }): Promise<User[] | null> {
    throw new Error('Method not implemented.');
  }

  findOne(id: User['id']): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  async create(entity: CreateUserDTO): Promise<Omit<User, 'password'> | null> {
    const { email, password } = entity;
    try {
      const userExists = await this.repository.findByEmail(email);
      if (userExists) {
        throw new ValidationError('User already exists');
      }

      const userToCreate = {
        email,
        password: bcrypt.hashSync(password, 10),
      };

      const newUser = await this.repository.create({ ...userToCreate });
      if (!newUser) {
        throw new Error('Error creating user');
      }

      const { password: _, ...userWithoutPassword } = newUser;

      return userWithoutPassword;
    } catch (e: any) {
      if (e.message.includes('Validation failed')) {
        throw new AppError(e.message, 400);
      }
      if (e.message === 'User already exists') {
        throw new AppError(e.message, 409);
      }
      throw new AppError(e.message, 400);
    }
  }

  update(id: User['id'], entity: User | Partial<User>): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }
}
