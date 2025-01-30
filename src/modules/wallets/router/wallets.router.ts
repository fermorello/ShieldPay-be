import { Request, Response } from 'express';
import { BaseRouter } from '../../../config/base.router';
import { WalletController } from '../controller/wallet.controller';
import { authMiddleware, WalletServiceImp } from '../../../shared/instances';
import { validateSchema } from '../../../shared/middleware/validate.middleware';
import { createWalletSchema } from '../dto/createWallet.dto';
import { updateWalletSchema } from '../dto/updateWallet.dto';

const WalletControllerImp = new WalletController(WalletServiceImp);

export default class WalletRouter extends BaseRouter<WalletController> {
  constructor() {
    super(WalletControllerImp);
  }
  routes(): void {
    this.router.get(
      '/wallets',
      [authMiddleware.authenticate as any],
      (req: Request, res: Response): any =>
        this.controller.findWalletsByUser(req, res)
    );
    this.router.post(
      '/wallets',
      [validateSchema(createWalletSchema), authMiddleware.authenticate as any],
      (req: Request, res: Response): any =>
        this.controller.createNewWallet(req, res)
    );
    this.router.get(
      '/wallets/:id',
      [authMiddleware.authenticate as any],
      (req: Request, res: Response): any =>
        this.controller.findWalletById(req, res)
    );
    this.router.put(
      '/wallets/:id',
      [validateSchema(updateWalletSchema), authMiddleware.authenticate as any],
      (req: Request, res: Response): any =>
        this.controller.updateWallet(req, res)
    );
    this.router.delete(
      '/wallets/:id',
      [authMiddleware.authenticate as any],
      (req: Request, res: Response): any =>
        this.controller.deleteWallet(req, res)
    );
  }
}
