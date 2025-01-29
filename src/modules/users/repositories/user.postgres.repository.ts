import { PrismaClient } from '@prisma/client';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user.interface';
import { DatabaseError } from '../../../shared/errors/app.errors';

export class UserPostgresRepository implements IUserRepository {
  constructor(readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) return null;
      return { ...user };
    } catch (e) {
      throw new DatabaseError('Error retrieving user from database');
    }
  }

  async find(query?: { [key: string]: unknown }): Promise<User[] | null> {
    try {
      const findMany = await this.prisma.user.findMany({ where: query });
      return findMany.map((user: User) => ({ ...user }));
    } catch (e) {
      throw new DatabaseError('Error retrieving users from database');
    }
  }

  async findOne(id: string | number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: Number(id) },
      });
      if (!user) return null;
      return { ...user };
    } catch (e) {
      throw new DatabaseError('Error retrieving user from database');
    }
  }
  async create(entity: Partial<User>): Promise<User | null> {
    const { email, password } = entity;
    try {
      const newUser = await this.prisma.user.create({
        data: { email: email!, password: password! },
      });
      if (!newUser) return null;
      return { ...newUser };
    } catch (e) {
      throw new DatabaseError('Error creating user in database');
    }
  }
  async update(id: string | number, entity: User): Promise<User | null> {
    const { id: userId, ...rest } = entity;
    try {
      const userUpdated = await this.prisma.user.update({
        data: { ...rest },
        where: { id: Number(id) },
      });
      return { ...userUpdated };
    } catch (e) {
      throw new DatabaseError('Error updating user in database');
    }
  }
}
