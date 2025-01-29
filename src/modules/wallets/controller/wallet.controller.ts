import { Request, Response } from 'express';
import { WalletService } from '../services/wallet.service';
import { HttpResponse } from '../../../shared/response/http.response';
import { CreateWalletDTO } from '../dto/createWallet.dto';
import { UpdateWalletDTO } from '../dto/updateWallet.dto';

export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async findWalletsByUser(req: Request, res: Response) {
    const user = req.user;
    try {
      const wallets = await this.walletService.findWalletsByUserId(user.userId);
      return this.httpResponse.Ok(res, wallets);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async findWalletById(req: Request, res: Response) {
    const user = req.user;
    const { id } = req.params;
    try {
      const wallet = await this.walletService.findOneWalletByWalletIdAndUserId(
        id,
        user.userId
      );
      return this.httpResponse.Ok(res, wallet);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async createNewWallet(req: Request, res: Response) {
    const user = req.user;
    const walletDto: CreateWalletDTO = req.body;
    try {
      const newWallet = await this.walletService.create(user.userId, walletDto);
      if (!newWallet) {
        return this.httpResponse.ERROR(res, 'Could not create wallet.');
      }
      return this.httpResponse.Ok(res, newWallet);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async updateWallet(req: Request, res: Response) {
    const user = req.user;
    const { id } = req.params;
    const walletDto: UpdateWalletDTO = req.body;
    try {
      const newWallet = await this.walletService.update(id, {
        user_id: user.userId,
        ...walletDto,
      });
      if (!newWallet) {
        return this.httpResponse.ERROR(res, 'Could not update wallet.');
      }
      return this.httpResponse.Ok(res, newWallet);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async deleteWallet(req: Request, res: Response) {
    const user = req.user;
    const { id } = req.params;
    try {
      const deleted = await this.walletService.delete(id, user.userId);
      if (!deleted) {
        return this.httpResponse.ERROR(res, 'Could not delete wallet.');
      }
      return this.httpResponse.Ok(res, 'Deleted Succesfully.');
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }
}
