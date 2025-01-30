import { PrismaClient } from '@prisma/client';
import { IChainRepository } from '../interfaces/chain.interface';
import { DatabaseError } from '../../../shared/errors/app.errors';
import { Chain } from '../entities/chain.entity';

export class ChainPostgresRepository implements IChainRepository {
  constructor(readonly prisma: PrismaClient) {}

  async find(query?: { [key: string]: unknown }): Promise<Chain[] | null> {
    try {
      const findMany = await this.prisma.chain.findMany({ where: query });
      return findMany.map((chain: Chain) => ({ ...chain }));
    } catch (e) {
      throw new DatabaseError('Error retrieving chains from database');
    }
  }

  async findOne(id: string | number): Promise<Chain | null> {
    try {
      const chain = await this.prisma.chain.findUnique({
        where: { id: Number(id) },
      });
      if (!chain) return null;
      return { ...chain };
    } catch (e) {
      throw new DatabaseError('Error retrieving chain from database');
    }
  }
  async findOneByName(name: string): Promise<Chain | null> {
    try {
      const chain = await this.prisma.chain.findUnique({
        where: { name },
      });
      if (!chain) return null;
      return { ...chain };
    } catch (e) {
      throw new DatabaseError('Error retrieving chain from database');
    }
  }

  async create(entity: Partial<Chain>): Promise<Chain | null> {
    const { name, description, symbol } = entity;
    try {
      const newChain = await this.prisma.chain.create({
        data: { name: name!, description: description!, symbol: symbol! },
      });
      if (!newChain) return null;
      return { ...newChain };
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error creating chain in database');
    }
  }
  async update(id: string | number, entity: Chain): Promise<Chain | null> {
    const { id: chainId, ...rest } = entity;
    try {
      const chainUpdated = await this.prisma.chain.update({
        data: { ...rest },
        where: { id: Number(id) },
      });
      return { ...chainUpdated };
    } catch (e) {
      throw new DatabaseError('Error updating chain in database');
    }
  }
}
