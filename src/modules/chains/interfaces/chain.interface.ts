import { Chain } from '../entities/chain.entity';
import IRepository from '../../../config/repository.interface';

export interface IChain {
  id: string | number;
  name: string;
  description: string;
}

export interface IChainRepository extends IRepository<Chain> {}

export interface IChainService {
  find(query?: { [key: string]: unknown }): Promise<Chain[] | null>;
  findOne(id: Chain['id']): Promise<Chain | null>;
  create(entity: Chain | Partial<Chain>): Promise<Chain | null>;
  update(
    id: Chain['id'],
    entity: Chain | Partial<Chain>
  ): Promise<Chain | null>;
}
