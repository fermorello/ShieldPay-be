import { Chain } from '../entities/chain.entity';
import IRepository from '../../../config/repository.interface';

export interface IChain {
  id: string | number;
  name: string;
  description: string;
  symbol: string;
}

export interface IChainRepository extends IRepository<Chain> {
  findOneByName(name: Chain['name']): Promise<Chain | null>;
}

export interface IChainService {
  find(query?: { [key: string]: unknown }): Promise<Chain[] | null>;
  findOne(id: Chain['id']): Promise<Chain | null>;
  findOneByName(id: Chain['name']): Promise<Chain | null>;
  create(entity: Chain | Partial<Chain>): Promise<Chain | null>;
  update(
    id: Chain['id'],
    entity: Chain | Partial<Chain>
  ): Promise<Chain | null>;
}
