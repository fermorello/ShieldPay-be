import morgan from 'morgan';
import express from 'express';
import { ConfigServer } from './config/config';
import { ErrorMiddleware } from './shared/middleware/error.middleware';
import UserRouter from './modules/users/router/user.router';
import AuthRouter from './modules/auth/routes/auth.router';

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv('PORT');

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));

    this.app.use('/api', this.routers());
    this.app.use(ErrorMiddleware.error);
    this.listen();
  }

  public routers(): Array<express.Router> {
    return [new UserRouter().router, new AuthRouter().router];
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log('Server listening on port => ' + this.port);
    });
  }
}

new ServerBootstrap();
