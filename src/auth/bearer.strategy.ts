import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {
    super();
  }

  async validate(token: string): Promise<any> {
    let user: User;
    try {
      const payload = await this.jwtService.verifyAsync(token);

      user = (await this.userService.findById(payload.id)) as User;
    } catch (e) {
      console.log(
        new Date().toISOString(),
        ' [JWT VERIFY ERROR] ',
        JSON.stringify(e),
        ' [TOKEN] ',
        token,
      );
      throw new UnauthorizedException();
    }

    return user;
  }
}
