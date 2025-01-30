import { BaseService } from '../../../config/base.service';
import { User } from '../../users/entities/user.entity';
import { CreateWalletDTO } from '../dto/createWallet.dto';
import { UpdateWalletDTO } from '../dto/updateWallet.dto';
import { Wallet } from '../entities/wallet.entity';
import {
  IWalletRepository,
  IWalletService,
} from '../interfaces/wallet.interface';

export class WalletService
  extends BaseService<Wallet, IWalletRepository>
  implements IWalletService
{
  constructor(repository: IWalletRepository) {
    super(repository);
  }
  async findOne(id: Wallet['id']): Promise<Wallet | null> {
    return this.repository.findOne(id);
  }

  findOneWalletByWalletIdAndUserId(
    wallet_id: Wallet['id'],
    user_id: User['id']
  ): Promise<Wallet | null> {
    return this.repository.findOneWalletByWalletIdAndUserId(wallet_id, user_id);
  }

  async findWalletsByUserId(user_id: User['id']): Promise<Wallet[] | []> {
    return this.repository.findWalletsByUserId(user_id);
  }

  async create(
    user_id: string,
    newWallet: CreateWalletDTO
  ): Promise<Wallet | null> {
    return this.repository.create({
      user_id,
      ...newWallet,
    });
  }

  update(
    user_id: string,
    wallet: UpdateWalletDTO & { user_id: string }
  ): Promise<Wallet | null> {
    return this.repository.update(user_id, wallet);
  }

  delete(wallet_id: Wallet['id'], user_id: User['id']): Promise<Boolean> {
    return this.repository.delete(wallet_id, user_id);
  }
}
