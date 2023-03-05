import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { IRequest } from '../../../common/interfaces/request.interface';
import { RoleEnum } from '../../roles/enums/role.enum';

Injectable();
export class RoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequest>();
    if (
      request.user.role_id !== RoleEnum.Administrator &&
      request.user.role_id !== RoleEnum.Boss
    ) {
      throw new HttpException(
        { message: 'Regular can`t change boss' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
