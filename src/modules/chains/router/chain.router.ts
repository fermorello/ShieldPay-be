import { Request, Response } from 'express';
import { BaseRouter } from '../../../config/base.router';
import { ChainServiceImp } from '../../../shared/instances';
import { ChainController } from '../controller/chain.controller';

const ChainControllerImp = new ChainController(ChainServiceImp);

export default class ChainRouter extends BaseRouter<ChainController> {
  constructor() {
    super(ChainControllerImp);
  }
  routes(): void {
    this.router.get('/chains', (req: Request, res: Response): any =>
      this.controller.findChains(req, res)
    );
    this.router.post('/chains', (req: Request, res: Response): any =>
      this.controller.createNewChain(req, res)
    );
  }
}
