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

  findOneByName(name: Chain['name']): Promise<Chain | null> {
    return this.repository.findOneByName(name);
  }

  async create(entity: CreateChainDTO): Promise<Chain | null> {
    const { name, description, symbol } = entity;
    const exists = await this.repository.findOneByName(name);
    if (exists) throw new Error('Chain allready exists');
    const newChain = await this.repository.create({
      name,
      description,
      symbol,
    });
    return newChain;
  }

  async update(
    id: Chain['id'],
    entity: Chain | Partial<Chain>
  ): Promise<Chain | null> {
    return this.repository.update(id, entity);
  }
}
