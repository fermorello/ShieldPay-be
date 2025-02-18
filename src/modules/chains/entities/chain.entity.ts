import { BaseEntity } from '../../../config/base.entity';
import { IChain } from '../interfaces/chain.interface';

export class Chain extends BaseEntity implements IChain {
  name: string;
  description: string;
  symbol: string;

  constructor({ id, name, description, symbol }: IChain) {
    super(id);
    this.name = name;
    this.description = description;
    this.symbol = symbol;
  }
}
