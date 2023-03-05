import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { IRequest } from '../../../common/interfaces/request.interface';

Injectable();
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IRequest>();
    if (request.user) {
      return true;
    }
    throw new HttpException(
      { message: 'Not authorize' },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
