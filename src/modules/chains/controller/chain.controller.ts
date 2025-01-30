import { Request, Response } from 'express';
import { ChainService } from '../services/chain.service';
import { HttpResponse } from '../../../shared/response/http.response';
import { CreateChainDTO } from '../dto/createChain.dto';

export class ChainController {
  constructor(
    private readonly chainService: ChainService,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async findChains(req: Request, res: Response) {
    try {
      const chains = await this.chainService.find();
      return this.httpResponse.Ok(res, chains);
    } catch (e) {
      console.error(e);
      return this.httpResponse.ERROR(res);
    }
  }

  async createNewChain(req: Request, res: Response) {
    const chainDto: CreateChainDTO = req.body;
    try {
      const newChain = await this.chainService.create(chainDto);
      if (!newChain) {
        return this.httpResponse.ERROR(res, 'Could not create chain.');
      }
      return this.httpResponse.Ok(res, newChain);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }

  async updateChain(req: Request, res: Response) {
    const { id } = req.params;
    const chainDto: { name?: string; description?: string } = req.body;
    try {
      const newChain = await this.chainService.update(id, {
        ...chainDto,
      });
      if (!newChain) {
        return this.httpResponse.ERROR(res, 'Could not update chain.');
      }
      return this.httpResponse.Ok(res, newChain);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }
}
