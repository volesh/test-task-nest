import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import * as Jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

import { IRequest } from '../../interfaces/request.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}
  async use(req: IRequest, res: Response, next: NextFunction) {
    const token = req.get('Authorization');
    if (!token) {
      req.user = null;
      next();
    } else {
      try {
        const decode = Jwt.verify(token, 'access_secret') as JwtPayload;
        req.user = await this.userService.findById(decode.id);
        next();
      } catch (e) {
        req.user = null;
        next();
      }
    }
  }
}
