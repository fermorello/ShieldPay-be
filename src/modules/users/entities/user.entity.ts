import { BaseEntity } from '../../../config/base.entity';
import { IUser } from '../interfaces/user.interface';

export class User extends BaseEntity {
  public email: string;
  public password: string;

  constructor({ id, email, password}: IUser) {
    super(id);
    this.email = email;
    this.password = password;
  }
}
