import { User } from '../../users/entities/user.entity';
import { Wallet } from '../entities/wallet.entity';
import { PrismaClient } from '@prisma/client/extension';
import { IWalletRepository } from '../interfaces/wallet.interface';
import { DatabaseError } from '../../../shared/errors/app.errors';

export class WalletPostgresRepository implements IWalletRepository {
  constructor(readonly prisma: PrismaClient) {}

  find(query?: { [key: string]: unknown }): Promise<Wallet[] | null> {
    throw new Error('Method not implemented.');
  }

  async findWalletsByUserId(user_id: User['id']): Promise<Wallet[] | []> {
    try {
      const wallets = await this.prisma.wallet.findMany({ where: { user_id } });

      if (!wallets.length) return [];

      return wallets;
    } catch (error) {
      throw new DatabaseError('Error retrieving wallets from database');
    }
  }

  async findOneWalletByWalletIdAndUserId(
    wallet_id: Wallet['id'],
    user_id: User['id']
  ): Promise<Wallet | null> {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: { id: +wallet_id, user_id: +user_id },
      });
      return wallet;
    } catch (error) {
      throw new DatabaseError('Error retrieving wallet from database');
    }
  }

  async findOne(id: string | number): Promise<Wallet | null> {
    try {
      const wallet = await this.prisma.wallet.findUnique({ where: { id } });
      return wallet;
    } catch (error) {
      throw new DatabaseError('Error retrieving wallet from database');
    }
  }

  async create(entity: Wallet | Partial<Wallet>): Promise<Wallet | null> {
    try {
      const newWallet = await this.prisma.wallet.create({
        data: {
          ...entity,
        },
      });

      if (!newWallet) return null;

      return newWallet;
    } catch (error) {
      throw new DatabaseError('Error creating wallet in the database');
    }
  }

  async update(
    id: string | number,
    entity: Wallet | Partial<Wallet>
  ): Promise<Wallet | null> {
    try {
      const updated = await this.prisma.wallet.update({
        data: {
          ...entity,
        },
        where: { id: +id, user_id: Number(entity.user_id) },
      });

      return updated;
    } catch (error) {
      console.error(error);
      throw new DatabaseError('Error updating wallet in the database');
    }
  }

  async delete(id: string | number, user_id: number): Promise<Boolean> {
    try {
      const deleted = await this.prisma.wallet.delete({
        where: { id: +id, user_id: Number(user_id) },
      });

      return deleted;
    } catch (error) {
      console.error(error);
      throw new DatabaseError('Error updating wallet in the database');
    }
  }
}
