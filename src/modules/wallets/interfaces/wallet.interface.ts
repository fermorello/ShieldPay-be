import IRepository from '../../../config/repository.interface';
import { Chain } from '../../chains/entities/chain.entity';
import { User } from '../../users/entities/user.entity';
import { CreateWalletDTO } from '../dto/createWallet.dto';
import { UpdateWalletDTO } from '../dto/updateWallet.dto';
import { Wallet } from '../entities/wallet.entity';

export interface IWallet {
  id: string;
  user_id: User['id'];
  tag?: string;
  chain_id: Chain['id'];
  address: string;
}

export interface IWalletRepository extends IRepository<Wallet> {
  findWalletsByUserId(user_id: User['id']): Promise<Wallet[] | []>;
  findWalletsByWalletAddress(address: Wallet['address']): Promise<Wallet[] | []>;
  findOneWalletByWalletIdAndUserId(
    wallet_id: Wallet['id'],
    user_id: User['id']
  ): Promise<Wallet | null>;
  delete(wallet_id: Wallet['id'], user_id: User['id']): Promise<Boolean>;
}

export interface IWalletService {
  findOne(id: Wallet['id']): Promise<Wallet | null>;
  findWalletsByUserId(user_id: User['id']): Promise<Wallet[] | []>;
  // findWalletsByWalletAddress(wallet: Wallet['address']): Promise<Wallet[] | []>;
  findOneWalletByWalletIdAndUserId(
    wallet_id: Wallet['id'],
    user_id: User['id']
  ): Promise<Wallet | null>;
  create(user_id: string, newWallet: CreateWalletDTO): Promise<Wallet | null>;
  update(user_id: string, wallet: UpdateWalletDTO): Promise<Wallet | null>;
  delete(wallet_id: Wallet['id'], user_id: User['id']): Promise<Boolean>;
}
