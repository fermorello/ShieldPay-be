import { PrismaClient } from '@prisma/client';
import { UserService } from '../../modules/users/services/user.service';
import { UserPostgresRepository } from '../../modules/users/repositories/user.postgres.repository';
import NodeCacheAdapter from '../cache/implementations/node-cache.cache';
import { AuthMiddleware } from '../middleware/authenticate.middleware';
import { WalletPostgresRepository } from '../../modules/wallets/repositories/wallet.potgres.repository';
import { WalletService } from '../../modules/wallets/services/wallet.service';

const prismaClient = new PrismaClient();

const userPostgresRepository = new UserPostgresRepository(prismaClient);
export const UserServiceImp = new UserService(userPostgresRepository);

export const nodeCacheImp = new NodeCacheAdapter();

export const authMiddleware = new AuthMiddleware(nodeCacheImp);

const walletPostgresRepository = new WalletPostgresRepository(prismaClient);
export const WalletServiceImp = new WalletService(walletPostgresRepository);
