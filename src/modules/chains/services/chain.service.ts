import { BaseService } from '../../../config/base.service';
import { Chain } from '../entities/chain.entity';
import { IChainRepository, IChainService } from '../interfaces/chain.interface';
import { CreateChainDTO } from '../dto/createChain.dto';

export class ChainService
  extends BaseService<Chain, IChainRepository>
  implements IChainService
{
  constructor(repository: IChainRepository) {
    super(repository);
  }

  find(query?: { [key: string]: unknown }): Promise<Chain[] | null> {
    return this.repository.find();
  }

  findOne(id: Chain['id']): Promise<Chain | null> {
    return this.repository.findOne(id);
  }

  async create(
    entity: CreateChainDTO
  ): Promise<Omit<Chain, 'password'> | null> {
    const { name, description } = entity;
    const newChain = await this.repository.create({ name, description });
    return newChain;
  }

  async update(
    id: Chain['id'],
    entity: Chain | Partial<Chain>
  ): Promise<Chain | null> {
    return this.repository.update(id, entity);
  }
}
