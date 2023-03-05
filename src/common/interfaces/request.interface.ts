import { Request } from 'express';

import { User } from '../../modules/users/entities/user.entity';

export interface IRequest extends Request {
  user?: User;
}
