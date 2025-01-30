import { BaseEntity } from '../../../config/base.entity';
import { Chain } from '../../chains/entities/chain.entity';
import { User } from '../../users/entities/user.entity';
import { IWallet } from '../interfaces/wallet.interface';

export class Wallet extends BaseEntity {
  user_id: User['id'];
  tag?: String;
  chain_id: Chain['id'];
  address: String;

  constructor({ id, user_id, chain_id, address }: IWallet) {
    super(id);
    this.user_id = user_id;
    this.chain_id = chain_id;
    this.address = address;
  }
}
