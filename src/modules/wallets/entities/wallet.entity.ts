import { BaseEntity } from '../../../config/base.entity';
import { User } from '../../users/entities/user.entity';
import { IWallet } from '../interfaces/wallet.interface';

export class Wallet extends BaseEntity {
  user_id: User['id'];
  tag?: String;
  chain: String;
  address: String;

  constructor({ id, user_id, chain, address }: IWallet) {
    super(id);
    this.user_id = user_id;
    this.chain = chain;
    this.address = address;
  }
}
